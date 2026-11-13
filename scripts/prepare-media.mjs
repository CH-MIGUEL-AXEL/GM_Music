import { spawnSync } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Re-run from the repository root. Originals are read only and never replaced.
const root = process.cwd();
for (const folder of ['photos', 'thumbnails', 'video', 'brand']) {
  mkdirSync(resolve(root, 'public/media', folder), { recursive: true });
}
mkdirSync(resolve(root, 'local/media-audit'), { recursive: true });

const entries = [
  [3, 'publico', 'Asistentes reunidos en el interior del recinto.', 'Concertgoers gathering inside the venue.'],
  [4, 'escenario', 'Banda en el escenario entre pantallas y luces rojas.', 'Band on stage surrounded by screens and red lights.'],
  [5, 'artistas', 'Cantante con sombrero negro interpretando frente al micrófono.', 'Singer in a black cowboy hat performing with a microphone.'],
  [6, 'escenario', 'Vista del escenario con músicos y visuales en tonos cálidos.', 'Stage view with musicians and warm-toned screen visuals.'],
  [7, 'publico', 'Público frente al escenario iluminado del concierto.', 'Audience facing the illuminated concert stage.'],
  [8, 'artistas', 'Acordeonista con sombrero blanco bajo iluminación azul.', 'Accordionist in a white cowboy hat under blue lighting.'],
  [9, 'escenario', 'Pasarela hacia el escenario con pantallas de figuras luminosas.', 'Runway leading to the stage with luminous patterned screens.'],
  [10, 'artistas', 'Vocalista con sombrero negro cantando en primer plano.', 'Close-up of a vocalist in a black cowboy hat singing.'],
  [11, 'artistas', 'Saxofonista sobre el escenario frente a una pantalla.', 'Saxophonist on stage in front of a screen.'],
  [12, 'artistas', 'Bajista tocando frente a visuales en blanco y negro.', 'Bassist performing in front of black-and-white visuals.'],
  [13, 'artistas', 'Guitarrista en el escenario bajo luces rojas.', 'Guitarist performing on stage under red lights.'],
  [14, 'artistas', 'Músico tocando un acordeón rojo durante el concierto.', 'Musician playing a red accordion during the concert.'],
  [15, 'artistas', 'Baterista interpretando detrás de su batería.', 'Drummer performing behind a drum kit.'],
  [16, 'artistas', 'Vocalista con sombrero blanco y micrófono durante su presentación.', 'Vocalist in a white cowboy hat holding a microphone during the show.'],
  [17, 'artistas', 'Músico en el escenario con una pantalla de diseño circular al fondo.', 'Musician on stage with a circular screen graphic behind him.'],
  [18, 'artistas', 'Cantante con sombrero blanco frente a visuales de colores.', 'Singer in a white cowboy hat in front of colorful screen visuals.'],
  [19, 'artistas', 'Acordeonista con camisa de cuadros y sombrero negro.', 'Accordionist wearing a checked shirt and black cowboy hat.'],
  [20, 'artistas', 'Acordeonista cantando al micrófono junto a otro músico.', 'Accordionist singing into a microphone beside another musician.'],
  [21, 'artistas', 'Acordeonista levantando una mano durante su presentación.', 'Accordionist raising one hand during the performance.'],
  [22, 'artistas', 'Guitarrista con sombrero negro visto desde un ángulo bajo.', 'Guitarist in a black cowboy hat viewed from a low angle.'],
  [23, 'artistas', 'Guitarrista de camisa de cuadros tocando bajo luces azules.', 'Guitarist in a checked shirt performing under blue lights.'],
  [24, 'escenario', 'Los Dos de Tamaulipas sobre el escenario con su nombre en pantalla.', 'Los Dos de Tamaulipas on stage with their name on the screen.'],
  [25, 'escenario', 'Presentación de Los Dos de Tamaulipas entre haces de luz.', 'Los Dos de Tamaulipas performing amid stage light beams.'],
  [26, 'publico', 'Vista amplia del público y el escenario desde el fondo del recinto.', 'Wide view of the audience and stage from the back of the venue.'],
  [27, 'artistas', 'Acordeonista con sombrero negro en una toma desde el escenario.', 'Accordionist in a black cowboy hat photographed on stage.'],
  [28, 'escenario', 'Banda en vivo sobre un escenario con haces de luz azul.', 'Live band on a stage filled with blue light beams.'],
  [29, 'escenario', 'Músicos sobre el escenario con pantallas y luces azules.', 'Musicians on stage with screens and blue lighting.'],
  [30, 'artistas', 'Acordeonista interpretando bajo luces azules.', 'Accordionist performing under blue lights.'],
  [31, 'artistas', 'Guitarrista cantando al micrófono sobre el escenario.', 'Guitarist singing into a microphone on stage.'],
  [32, 'artistas', 'Músico con sombrero negro sosteniendo su guitarra en el escenario.', 'Musician in a black cowboy hat holding a guitar on stage.'],
  [33, 'artistas', 'Acordeonista junto a un guitarrista durante el concierto.', 'Accordionist beside a guitarist during the concert.'],
  [34, 'artistas', 'Acordeonista cantando bajo el techo del recinto.', 'Accordionist singing beneath the venue roof.'],
  [35, 'publico', 'Artista de espaldas frente al público junto a la pasarela.', 'Performer seen from behind facing the audience beside the runway.'],
  [36, 'artistas', 'Guitarrista sobre la pasarela entre humo y luces.', 'Guitarist on the runway amid haze and stage lighting.'],
  [37, 'artistas', 'Guitarrista sonriendo mientras toca frente al público.', 'Guitarist smiling while playing in front of the audience.'],
  [38, 'publico', 'Vista desde el escenario hacia los asistentes del concierto.', 'View from the stage toward the concert audience.'],
  [39, 'produccion', 'Equipo reunido con un cartel frente al público del concierto.', 'Team gathered with a poster in front of the concert audience.'],
  [40, 'produccion', 'Foto grupal del equipo con un cartel y luces del público al fondo.', 'Team group photo with a poster and audience lights in the background.'],
  [41, 'escenario', 'Pasarela iluminada con luces azules y efectos de chispas.', 'Runway illuminated with blue lights and spark effects.'],
  [42, 'artistas', 'Guitarrista sonriendo durante su presentación en la pasarela.', 'Guitarist smiling during a performance on the runway.'],
  [43, 'artistas', 'Guitarrista señalando hacia arriba durante el concierto.', 'Guitarist pointing upward during the concert.'],
  [44, 'publico', 'Acordeonista sobre la pasarela rodeado por el público.', 'Accordionist on the runway surrounded by the audience.'],
  [45, 'artistas', 'Dúo de guitarra y acordeón tocando en la pasarela.', 'Guitar and accordion duo performing on the runway.'],
  [46, 'artistas', 'Dúo de músicos animando al público desde la pasarela.', 'Musical duo engaging the audience from the runway.'],
  [47, 'publico', 'Pantalla de un celular grabando al guitarrista durante el show.', 'Phone screen recording the guitarist during the show.'],
  [48, 'artistas', 'Guitarrista y acordeonista cantando juntos sobre el escenario.', 'Guitarist and accordionist singing together on stage.'],
  [49, 'artistas', 'Guitarrista de sombrero negro frente a la estructura iluminada del recinto.', 'Guitarist in a black cowboy hat beneath the illuminated venue structure.'],
  [50, 'publico', 'Panorámica del concierto desde el público con escenario azul.', 'Panoramic view of the concert from the audience with a blue-lit stage.'],
  [51, 'publico', 'Asistentes grabando con sus celulares frente al escenario.', 'Audience members recording with phones in front of the stage.'],
  [52, 'publico', 'Vista general de los asistentes y el escenario al fondo del recinto.', 'Wide view of concertgoers and the stage at the far end of the venue.'],
];

function run(args) {
  const result = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.stderr || `ffmpeg exited ${result.status}`);
}
function dimensions(file) {
  const result = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', file], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr);
  return JSON.parse(result.stdout).streams[0];
}
function photoPath(id, variant) { return `/media/${variant}/alliant-nov7-${id}.webp`; }
const photos = entries.map(([id, category, alt, altEn]) => {
  const original = `/imagenes/AlliantEnergy-Nov7-${id}.jpg`;
  const source = resolve(root, `public${original}`);
  const src = photoPath(id, 'photos');
  const thumbnail = photoPath(id, 'thumbnails');
  const dest = resolve(root, `public${src}`);
  run(['-i', source, '-vf', 'scale=1800:1800:force_original_aspect_ratio=decrease', '-c:v', 'libwebp', '-q:v', '82', '-compression_level', '5', '-frames:v', '1', dest]);
  run(['-i', source, '-vf', 'scale=720:720:force_original_aspect_ratio=decrease', '-c:v', 'libwebp', '-q:v', '78', '-compression_level', '5', '-frames:v', '1', resolve(root, `public${thumbnail}`)]);
  const { width, height } = dimensions(dest);
  process.stdout.write(`Photo ${id} ready\n`);
  return { id, src, thumbnail, alt, altEn, category, width, height, original };
});

run(['-i', 'public/Animacion/animacion_logo.mp4', '-vf', 'scale=960:540', '-c:v', 'libx264', '-preset', 'medium', '-crf', '27', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', 'public/media/video/logo.mp4']);
run(['-ss', '5.5', '-i', 'public/Animacion/animacion_logo.mp4', '-frames:v', '1', '-c:v', 'libwebp', '-q:v', '85', 'public/media/video/logo-poster.webp']);
run(['-i', 'public/videos/Recap-Nov7th.mp4', '-vf', 'scale=960:720:force_original_aspect_ratio=decrease', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', 'public/media/video/recap.mp4']);
run(['-ss', '21.5', '-i', 'public/videos/Recap-Nov7th.mp4', '-vf', 'scale=960:720:force_original_aspect_ratio=decrease', '-frames:v', '1', '-c:v', 'libwebp', '-q:v', '85', 'public/media/video/recap-poster.webp']);
run(['-i', 'public/logo-gm-music.png', '-vf', 'scale=640:640:force_original_aspect_ratio=decrease', '-c:v', 'libwebp', '-lossless', '1', '-compression_level', '6', '-frames:v', '1', 'public/media/brand/logo.webp']);

const videos = {
  logo: { src: '/media/video/logo.mp4', poster: '/media/video/logo-poster.webp', original: '/Animacion/animacion_logo.mp4', duration: 25.005, width: 960, height: 540 },
  recap: { src: '/media/video/recap.mp4', poster: '/media/video/recap-poster.webp', original: '/videos/Recap-Nov7th.mp4', duration: 31.667, width: 960, height: 720 },
};
const categories = [
  { id: 'todos', label: 'Todo', labelEn: 'All' },
  { id: 'escenario', label: 'Escenario', labelEn: 'Stage' },
  { id: 'artistas', label: 'Artistas', labelEn: 'Artists' },
  { id: 'publico', label: 'Público', labelEn: 'Audience' },
  { id: 'produccion', label: 'Equipo', labelEn: 'Team' },
];
const source = `// Generated by scripts/prepare-media.mjs. Original files remain untouched.\nexport type MediaCategory = 'escenario' | 'artistas' | 'publico' | 'produccion';\n\nexport interface GalleryPhoto {\n  id: number;\n  src: string;\n  thumbnail: string;\n  alt: string;\n  altEn: string;\n  category: MediaCategory;\n  width: number;\n  height: number;\n  original: string;\n}\n\nexport const galleryPhotos: GalleryPhoto[] = ${JSON.stringify(photos, null, 2)};\n\nexport const mediaCategories: { id: 'todos' | MediaCategory; label: string; labelEn: string }[] = ${JSON.stringify(categories, null, 2)};\n\nexport const heroPhotoId = 28;\nexport const featuredPhotoIds = [28, 8, 25, 41, 46, 39, 47, 4];\n\nexport const mediaVideos = ${JSON.stringify(videos, null, 2)};\n`;
writeFileSync(resolve(root, 'src/app/media-library.ts'), source);
const sizes = { photos: photos.reduce((n, p) => n + statSync(resolve(root, `public${p.src}`)).size, 0), thumbnails: photos.reduce((n, p) => n + statSync(resolve(root, `public${p.thumbnail}`)).size, 0), logo: statSync('public/media/video/logo.mp4').size, recap: statSync('public/media/video/recap.mp4').size };
writeFileSync(resolve(root, 'local/media-audit/processing-result.json'), JSON.stringify({ photos, videos, sizes }, null, 2));
mkdirSync(resolve(root, 'docs'), { recursive: true });
const mb = (n) => (n / 1_000_000).toFixed(2) + ' MB';
const labels = Object.fromEntries(categories.map((c) => [c.id, c.label]));
const rows = photos.map((p) => `| ${p.id} | ${labels[p.category]} | ${p.width} × ${p.height} | ${p.alt} |`).join('\n');
const documentation = `# Biblioteca visual de GM Music

Revisión visual de los 50 JPG, el video recap y la animación de marca recibidos en public. Los archivos originales se conservan sin cambios y sin moverlos.

## Clasificación

| Colección | Cantidad | Contenido |
| --- | ---: | --- |
| Artistas | 30 | Voz, acordeón, guitarra, bajo, saxofón y batería en vivo. |
| Escenario | 8 | Pantallas, pasarela, iluminación y efectos del espectáculo. |
| Público | 10 | Asistentes, vistas del recinto e interacción con músicos. |
| Equipo | 2 | Fotografías grupales con un cartel en el evento. |
| Videos | 1 | Recap-Nov7th.mp4, duración de 31.67 segundos. |
| Animaciones | 1 | animacion_logo.mp4, duración de 25 segundos. |

El nombre del evento y “7 de noviembre” proceden de los nombres de archivo, sin asignar un año. Las descripciones documentan lo visible sin deducir cifras de ventas ni funciones de las personas retratadas.

## Archivos y optimización

| Recurso | Original | Versión para web |
| --- | ---: | ---: |
| 50 fotografías | 756.23 MB | ${mb(sizes.photos)} en WebP, lado máximo de 1800 px |
| 50 miniaturas | — | ${mb(sizes.thumbnails)} en WebP, lado máximo de 720 px |
| Animación del logo | 9.26 MB, H.264, 1280 × 720 | ${mb(sizes.logo)}, H.264, 960 × 540, sin audio |
| Recap | 35.23 MB, HEVC, 1440 × 1080 | ${mb(sizes.recap)}, H.264 + AAC, 960 × 720 |

Las fotografías principales pesan aproximadamente un 98.7 % menos que los originales. Los MP4 incluyen metadatos faststart para comenzar a reproducirse sin descargar el archivo completo. Se conserva el audio del recap. La copia del logo se entrega sin audio para usarla como animación de marca; su original conserva el audio recibido.

Rutas exactas:

- Original de la foto con ID N: public/imagenes/AlliantEnergy-Nov7-N.jpg.
- Foto optimizada: public/media/photos/alliant-nov7-N.webp.
- Miniatura: public/media/thumbnails/alliant-nov7-N.webp.
- Animación: public/media/video/logo.mp4; cartel de vista previa: public/media/video/logo-poster.webp.
- Recap: public/media/video/recap.mp4; cartel de vista previa: public/media/video/recap-poster.webp.
- Logo estático: public/media/brand/logo.webp, 640 × 640, con transparencia conservada.
- Catálogo para Angular: src/app/media-library.ts; incluye rutas, dimensiones, categoría y textos alternativos en español e inglés.

## Criterio de presentación

- Usar la foto 28 como portada: escena amplia y luz azul que combina con el logo dorado.
- Presentar una selección variada de ocho fotos (28, 8, 25, 41, 46, 39, 47 y 4) antes de la colección completa.
- Ofrecer las 50 fotografías con filtros y un visor ampliado que permita recorrerlas. Las miniaturas y la carga diferida evitan descargar todos los originales.
- Dar al recap un reproductor con controles y un cartel visible. La reproducción con sonido empieza cuando la persona pulsa reproducir.
- Colocar la animación de marca en una sección propia, con control para iniciarla o pausarla. Evitar que bloquee el acceso a la portada o que compita con el recap.
- Mantener una versión estática del logo para el encabezado, dispositivos con ahorro de datos y preferencias de movimiento reducido.

Las fotos 39 y 40 son tomas similares de un grupo: ambas permanecen disponibles, pero la selección inicial usa solo la 39. Las tomas 50–52 y 7/26 muestran vistas generales; conviene distribuirlas entre retratos y detalles para evitar una galería visualmente repetitiva.

## Inventario de fotografías

Cada ID corresponde a las tres rutas del patrón anterior. Las dimensiones son las de la foto optimizada. Los originales van del ID 3 al 52, de forma consecutiva.

| ID | Categoría | Web (px) | Descripción visual |
| ---: | --- | --- | --- |
${rows}

## Reproducir la preparación

Requisitos locales: Node.js, ffmpeg y ffprobe disponibles en PATH. Desde la raíz del proyecto:

\`\`\`powershell
node scripts/prepare-media.mjs
\`\`\`

El proceso vuelve a crear únicamente derivados en public/media, el catálogo src/app/media-library.ts, este inventario y un reporte local. Nunca modifica los originales.
`;
writeFileSync(resolve(root, 'docs/media-library.md'), documentation);
process.stdout.write('Media manifest and optimized assets ready.\n');
