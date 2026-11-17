# Mates para la vida

Aplicación educativa para Matemáticas A de 4.º ESO. La primera unidad, **El polinomio de la vida**, propone que un equipo diseñe un presupuesto de independencia y lo modele con polinomios.

## Desarrollo

```sh
npm install
npm run dev
```

`npm run build` genera el sitio estático en `dist/`. Usa `npm run preview` para revisar el resultado del build.

## Publicar en GitHub Pages

1. Sube el proyecto a la rama `main` de tu repositorio de GitHub.
2. En el repositorio, abre **Settings → Pages** y selecciona **GitHub Actions** en **Source**.
3. En **Actions**, ejecuta **Publicar en GitHub Pages** (o sube un nuevo cambio a `main`).
4. Cuando termine, el enlace público aparecerá en **Settings → Pages** y en el despliegue.

La dirección habitual es `https://USUARIO.github.io/REPOSITORIO/`. La configuración obtiene automáticamente el usuario y el nombre del repositorio durante la compilación en GitHub Actions. Los siguientes cambios que subas a `main` se publicarán automáticamente.

No subas `node_modules`, `dist` ni archivos `.env`: están excluidos mediante `.gitignore`.

## Estructura

- `src/pages/`: páginas Astro y metadatos.
- `src/react/`: interfaz interactiva de juego, cuaderno y controles.
- `src/lib/`: datos de misiones y reglas matemáticas puras.
- `src/styles/`: sistema visual responsive.

El estado se guarda en `localStorage` en el navegador. El progreso se descarga y se recupera mediante PDF; los informes también se generan en el navegador. Para continuar en otro ordenador hay que descargar el progreso y cargar ese PDF allí. No se usan cuentas, base de datos ni analítica.

## Privacidad y publicación

Los alias son opcionales y el juego pide no introducir nombres reales. No se envían datos a un servidor. Al publicar en Cloudflare Pages, configura el comando de build `npm run build` y el directorio `dist`.
