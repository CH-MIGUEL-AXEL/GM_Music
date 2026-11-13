import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import ts from 'typescript';

// Run from the repository root. Pass the local server URL to also verify HTTP delivery:
// node scripts/verify-media.mjs http://127.0.0.1:4200
const root = process.cwd();
const publicRoot = resolve(root, 'public');
const manifest = await readFile(resolve(root, 'src/app/media-library.ts'), 'utf8');
const compiled = ts.transpileModule(manifest, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { galleryPhotos, mediaCategories, heroPhotoId, featuredPhotoIds, mediaVideos } =
  await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

function localPath(urlPath) {
  assert.ok(urlPath.startsWith('/'), `Expected absolute asset URL: ${urlPath}`);
  const filePath = resolve(publicRoot, `.${urlPath}`);
  assert.ok(filePath.startsWith(`${publicRoot}${sep}`), `Asset outside public: ${urlPath}`);
  return filePath;
}

async function optionalStat(filePath) {
  try { return await stat(filePath); }
  catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function webpDimensions(bytes) {
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', 'Invalid WebP RIFF header');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', 'Invalid WebP format');
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const tag = bytes.toString('ascii', offset, offset + 4);
    const length = bytes.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (tag === 'VP8X') {
      return { width: 1 + bytes.readUIntLE(data + 4, 3), height: 1 + bytes.readUIntLE(data + 7, 3) };
    }
    if (tag === 'VP8 ') {
      assert.equal(bytes.toString('hex', data + 3, data + 6), '9d012a', 'Invalid VP8 frame');
      return { width: bytes.readUInt16LE(data + 6) & 0x3fff, height: bytes.readUInt16LE(data + 8) & 0x3fff };
    }
    if (tag === 'VP8L') {
      assert.equal(bytes[data], 0x2f, 'Invalid lossless WebP signature');
      const bits = bytes.readUInt32LE(data + 1);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >>> 14) & 0x3fff) };
    }
    offset = data + length + (length % 2);
  }
  throw new Error('WebP dimensions missing');
}

const originalsDirectory = resolve(publicRoot, 'imagenes');
const originals = await optionalStat(originalsDirectory)
  ? (await readdir(originalsDirectory)).filter((name) => /\.jpe?g$/i.test(name))
  : null;
assert.equal(galleryPhotos.length, 50, 'Expected all 50 photographs in the gallery');
assert.equal(new Set(galleryPhotos.map((photo) => photo.id)).size, galleryPhotos.length, 'Photo IDs must be unique');
assert.equal(new Set(galleryPhotos.map((photo) => photo.original)).size, galleryPhotos.length, 'Original mapping must be unique');
if (originals) {
  assert.equal(originals.length, galleryPhotos.length, 'Expected all 50 original photographs when the source directory exists');
  assert.deepEqual(new Set(galleryPhotos.map((photo) => photo.original)), new Set(originals.map((name) => `/imagenes/${name}`)));
}
const categoryIds = new Set(mediaCategories.map((category) => category.id));
const assets = new Set(['/media/brand/logo.webp']);
let originalPhotoBytes = 0;
let optimizedPhotoBytes = 0;
let thumbnailBytes = 0;

for (const photo of galleryPhotos) {
  assert.ok(categoryIds.has(photo.category), `Unknown category for photo ${photo.id}`);
  assert.ok(photo.alt?.trim() && photo.altEn?.trim(), `Missing ES/EN caption for photo ${photo.id}`);
  const image = await readFile(localPath(photo.src));
  const thumbnail = await readFile(localPath(photo.thumbnail));
  assert.deepEqual(webpDimensions(image), { width: photo.width, height: photo.height }, `Dimensions for photo ${photo.id}`);
  assert.ok(Math.max(photo.width, photo.height) <= 1800, `Oversized photo ${photo.id}`);
  const thumbnailSize = webpDimensions(thumbnail);
  assert.ok(Math.max(thumbnailSize.width, thumbnailSize.height) <= 720, `Oversized thumbnail ${photo.id}`);
  assert.ok(Math.abs(photo.width / photo.height - thumbnailSize.width / thumbnailSize.height) < 0.01, `Thumbnail aspect ratio changed for ${photo.id}`);
  if (originals) originalPhotoBytes += (await stat(localPath(photo.original))).size;
  optimizedPhotoBytes += image.length;
  thumbnailBytes += thumbnail.length;
  assets.add(photo.src);
  assets.add(photo.thumbnail);
}

const photoIds = new Set(galleryPhotos.map((photo) => photo.id));
assert.ok(photoIds.has(heroPhotoId), 'Hero photo must exist');
assert.equal(new Set(featuredPhotoIds).size, featuredPhotoIds.length, 'Featured photos must be unique');
for (const id of featuredPhotoIds) assert.ok(photoIds.has(id), `Missing featured photo ${id}`);

for (const [name, video] of Object.entries(mediaVideos)) {
  for (const key of ['src', 'poster']) assert.ok((await stat(localPath(video[key]))).size > 0, `Empty ${name} ${key}`);
  const original = await optionalStat(localPath(video.original));
  if (original) assert.ok(original.size > 0, `Empty ${name} original`);
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,codec_name,width,height:format=duration', '-of', 'json', localPath(video.src)], { encoding: 'utf8' });
  assert.equal(probe.status, 0, `ffprobe failed for ${name}: ${probe.stderr}`);
  const metadata = JSON.parse(probe.stdout);
  const videoStream = metadata.streams.find((stream) => stream.codec_type === 'video');
  const audioStream = metadata.streams.find((stream) => stream.codec_type === 'audio');
  assert.equal(videoStream?.codec_name, 'h264', `Browser-compatible H.264 video required for ${name}`);
  assert.equal(audioStream?.codec_name, 'aac', `Original audio must be preserved as AAC for ${name}`);
  assert.equal(videoStream.width, video.width, `Video width for ${name}`);
  assert.equal(videoStream.height, video.height, `Video height for ${name}`);
  assert.ok(Math.abs(Number(metadata.format.duration) - video.duration) < 0.2, `Video duration for ${name}`);
  const poster = webpDimensions(await readFile(localPath(video.poster)));
  assert.ok(Math.abs(poster.width / poster.height - video.width / video.height) < 0.01, `Poster aspect ratio for ${name}`);
  assets.add(video.src);
  assets.add(video.poster);
}

webpDimensions(await readFile(localPath('/media/brand/logo.webp')));

const baseUrl = process.argv[2];
if (baseUrl) {
  const page = await fetch(new URL('/', baseUrl), { signal: AbortSignal.timeout(15000) });
  assert.equal(page.status, 200, 'Homepage must return HTTP 200');
  assert.match(await page.text(), /<app-root>/, 'Homepage is missing Angular root');
  const pending = [...assets];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (pending.length) {
      const asset = pending.pop();
      const response = await fetch(new URL(asset, baseUrl), { method: 'HEAD', signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, `HTTP delivery failed for ${asset}`);
      assert.match(response.headers.get('content-type') ?? '', asset.endsWith('.mp4') ? /video\/mp4/ : /image\/webp/, `Wrong MIME type for ${asset}`);
    }
  }));
  for (const video of Object.values(mediaVideos)) {
    const response = await fetch(new URL(video.src, baseUrl), { headers: { Range: 'bytes=0-1023' }, signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 206, `Video seeking requires partial content: ${video.src}`);
    assert.match(response.headers.get('content-range') ?? '', /^bytes 0-1023\//);
    assert.equal((await response.arrayBuffer()).byteLength, 1024);
  }
}

console.log(JSON.stringify({
  photographs: galleryPhotos.length,
  categories: Object.fromEntries([...categoryIds].filter((id) => id !== 'todos').map((id) => [id, galleryPhotos.filter((photo) => photo.category === id).length])),
  videos: Object.keys(mediaVideos).length,
  originalPhotoMB: originals ? +(originalPhotoBytes / 1e6).toFixed(2) : null,
  optimizedPhotoMB: +(optimizedPhotoBytes / 1e6).toFixed(2),
  thumbnailMB: +(thumbnailBytes / 1e6).toFixed(2),
  originalPhotoReduction: originals ? `${(100 * (1 - optimizedPhotoBytes / originalPhotoBytes)).toFixed(1)}%` : null,
  verifiedHttpAssets: baseUrl ? assets.size : 0,
  videoRangeRequests: baseUrl ? Object.keys(mediaVideos).length : 0,
}, null, 2));
