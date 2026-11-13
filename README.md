# GM Music

Página principal con archivo visual de Alliant Energy: 50 fotografías clasificadas, video del evento y animación del logo. Interfaz en español e inglés, galería con filtros y visor con navegación por teclado.

## Inicio local en Windows

```powershell
npm.cmd start -- --host 127.0.0.1 --port 4200
```

Abre http://127.0.0.1:4200/. El servidor actualiza la página al guardar cambios.

```powershell
npm.cmd run build
npm.cmd run media:verify -- http://127.0.0.1:4200
```

Consulta [el inventario y la clasificación de medios](docs/media-library.md) para ver las categorías, las rutas y el proceso de optimización. Los originales permanecen en `public/imagenes`, `public/videos` y `public/Animacion`; la página usa las copias optimizadas de `public/media`. La compilación de producción omite los originales para mantener ligero el sitio.

Los originales se conservan localmente y están excluidos de Git. Las versiones optimizadas se incluyen en el repositorio y permiten ejecutar y compilar el sitio después de clonarlo. `media:verify` requiere FFprobe instalado y verifica también los originales cuando están presentes; `media:prepare` requiere FFmpeg, FFprobe y todos los originales en sus rutas indicadas.

## Angular CLI

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
