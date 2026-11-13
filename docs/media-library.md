# Biblioteca visual de GM Music

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
| 50 fotografías | 756.23 MB | 9.79 MB en WebP, lado máximo de 1800 px |
| 50 miniaturas | — | 2.10 MB en WebP, lado máximo de 720 px |
| Animación del logo | 9.26 MB, H.264, 1280 × 720 | 3.34 MB, H.264 + AAC, 960 × 540 |
| Recap | 35.23 MB, HEVC, 1440 × 1080 | 10.68 MB, H.264 + AAC, 960 × 720 |

Las fotografías principales pesan aproximadamente un 98.7 % menos que los originales. Los MP4 incluyen metadatos faststart para comenzar a reproducirse sin descargar el archivo completo. Ambos videos conservan el audio recibido; solo se reproducen cuando la persona lo solicita y ofrecen controles para pausar y ajustar el volumen.

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

## Integración y mantenimiento

La página principal usa únicamente las versiones de `public/media/`. Los originales siguen en sus carpetas iniciales. La configuración de producción excluye los originales de la carpeta compilada para evitar copiar más de 790 MB que la página no utiliza; el servidor de desarrollo permite seguir consultándolos.

Las carpetas de originales están excluidas de Git y permanecen como respaldo local. El repositorio incluye los medios optimizados necesarios para ejecutar y compilar la página. Para regenerarlos es necesario restaurar primero todos los originales en sus rutas indicadas.

- `npm.cmd start -- --host 127.0.0.1 --port 4200`: servidor local en http://127.0.0.1:4200/.
- `npm.cmd run build`: compilación de producción.
- `npm.cmd run media:verify -- http://127.0.0.1:4200`: verifica catálogo, dimensiones, rutas, tipos MIME y solicitudes parciales de video. Requiere FFprobe. Verifica también los originales cuando existen localmente; funciona en un clon con solo los medios optimizados.
- `npm.cmd run media:prepare`: regenera las versiones web y el catálogo. Requiere FFmpeg y FFprobe instalados. Las categorías y descripciones se mantienen en `scripts/prepare-media.mjs`.

La galería comienza con nueve fotografías y agrega doce por cada pulsación de “Ver más fotografías”. Los filtros muestran las colecciones completas; el visor puede recorrer toda la categoría con flechas, aunque aún no se hayan cargado todas las tarjetas. Escape cierra el visor. Se mantiene el selector de idioma español/inglés y se recuerda la preferencia en el navegador.

Las fotos 39 y 40 son tomas similares de un grupo: ambas permanecen disponibles, pero la selección inicial usa solo la 39. Las tomas 50–52 y 7/26 muestran vistas generales; conviene distribuirlas entre retratos y detalles para evitar una galería visualmente repetitiva.

## Inventario de fotografías

Cada ID corresponde a las tres rutas del patrón anterior. Las dimensiones son las de la foto optimizada. Los originales van del ID 3 al 52, de forma consecutiva.

| ID | Categoría | Web (px) | Descripción visual |
| ---: | --- | --- | --- |
| 3 | Público | 1800 × 1200 | Asistentes reunidos en el interior del recinto. |
| 4 | Escenario | 1800 × 1200 | Banda en el escenario entre pantallas y luces rojas. |
| 5 | Artistas | 1199 × 1800 | Cantante con sombrero negro interpretando frente al micrófono. |
| 6 | Escenario | 1800 × 1200 | Vista del escenario con músicos y visuales en tonos cálidos. |
| 7 | Público | 1800 × 1200 | Público frente al escenario iluminado del concierto. |
| 8 | Artistas | 1200 × 1800 | Acordeonista con sombrero blanco bajo iluminación azul. |
| 9 | Escenario | 1800 × 1200 | Pasarela hacia el escenario con pantallas de figuras luminosas. |
| 10 | Artistas | 1201 × 1800 | Vocalista con sombrero negro cantando en primer plano. |
| 11 | Artistas | 1201 × 1800 | Saxofonista sobre el escenario frente a una pantalla. |
| 12 | Artistas | 1201 × 1800 | Bajista tocando frente a visuales en blanco y negro. |
| 13 | Artistas | 1201 × 1800 | Guitarrista en el escenario bajo luces rojas. |
| 14 | Artistas | 1201 × 1800 | Músico tocando un acordeón rojo durante el concierto. |
| 15 | Artistas | 1201 × 1800 | Baterista interpretando detrás de su batería. |
| 16 | Artistas | 1201 × 1800 | Vocalista con sombrero blanco y micrófono durante su presentación. |
| 17 | Artistas | 1201 × 1800 | Músico en el escenario con una pantalla de diseño circular al fondo. |
| 18 | Artistas | 1201 × 1800 | Cantante con sombrero blanco frente a visuales de colores. |
| 19 | Artistas | 1201 × 1800 | Acordeonista con camisa de cuadros y sombrero negro. |
| 20 | Artistas | 1800 × 1201 | Acordeonista cantando al micrófono junto a otro músico. |
| 21 | Artistas | 1800 × 1201 | Acordeonista levantando una mano durante su presentación. |
| 22 | Artistas | 1201 × 1800 | Guitarrista con sombrero negro visto desde un ángulo bajo. |
| 23 | Artistas | 1201 × 1800 | Guitarrista de camisa de cuadros tocando bajo luces azules. |
| 24 | Escenario | 1800 × 1200 | Los Dos de Tamaulipas sobre el escenario con su nombre en pantalla. |
| 25 | Escenario | 1800 × 1201 | Presentación de Los Dos de Tamaulipas entre haces de luz. |
| 26 | Público | 1800 × 1201 | Vista amplia del público y el escenario desde el fondo del recinto. |
| 27 | Artistas | 1800 × 1200 | Acordeonista con sombrero negro en una toma desde el escenario. |
| 28 | Escenario | 1800 × 1200 | Banda en vivo sobre un escenario con haces de luz azul. |
| 29 | Escenario | 1800 × 1200 | Músicos sobre el escenario con pantallas y luces azules. |
| 30 | Artistas | 1200 × 1800 | Acordeonista interpretando bajo luces azules. |
| 31 | Artistas | 1200 × 1800 | Guitarrista cantando al micrófono sobre el escenario. |
| 32 | Artistas | 1200 × 1800 | Músico con sombrero negro sosteniendo su guitarra en el escenario. |
| 33 | Artistas | 1200 × 1800 | Acordeonista junto a un guitarrista durante el concierto. |
| 34 | Artistas | 1200 × 1800 | Acordeonista cantando bajo el techo del recinto. |
| 35 | Público | 1800 × 1200 | Artista de espaldas frente al público junto a la pasarela. |
| 36 | Artistas | 1200 × 1800 | Guitarrista sobre la pasarela entre humo y luces. |
| 37 | Artistas | 1800 × 1200 | Guitarrista sonriendo mientras toca frente al público. |
| 38 | Público | 1800 × 1200 | Vista desde el escenario hacia los asistentes del concierto. |
| 39 | Equipo | 1800 × 1200 | Equipo reunido con un cartel frente al público del concierto. |
| 40 | Equipo | 1800 × 1200 | Foto grupal del equipo con un cartel y luces del público al fondo. |
| 41 | Escenario | 1800 × 1200 | Pasarela iluminada con luces azules y efectos de chispas. |
| 42 | Artistas | 1800 × 1200 | Guitarrista sonriendo durante su presentación en la pasarela. |
| 43 | Artistas | 1202 × 1800 | Guitarrista señalando hacia arriba durante el concierto. |
| 44 | Público | 1800 × 1200 | Acordeonista sobre la pasarela rodeado por el público. |
| 45 | Artistas | 1800 × 1200 | Dúo de guitarra y acordeón tocando en la pasarela. |
| 46 | Artistas | 1800 × 1200 | Dúo de músicos animando al público desde la pasarela. |
| 47 | Público | 1800 × 1200 | Pantalla de un celular grabando al guitarrista durante el show. |
| 48 | Artistas | 1800 × 1200 | Guitarrista y acordeonista cantando juntos sobre el escenario. |
| 49 | Artistas | 1200 × 1800 | Guitarrista de sombrero negro frente a la estructura iluminada del recinto. |
| 50 | Público | 1800 × 1200 | Panorámica del concierto desde el público con escenario azul. |
| 51 | Público | 1800 × 1200 | Asistentes grabando con sus celulares frente al escenario. |
| 52 | Público | 1800 × 1200 | Vista general de los asistentes y el escenario al fondo del recinto. |

## Reproducir la preparación

Requisitos locales: Node.js, ffmpeg y ffprobe disponibles en PATH. Desde la raíz del proyecto:

```powershell
node scripts/prepare-media.mjs
```

El proceso vuelve a crear únicamente derivados en public/media, el catálogo src/app/media-library.ts, este inventario y un reporte local. Nunca modifica los originales.
