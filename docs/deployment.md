# Despliegue público — frontend

Este es el **cuarto y último** paso de la guía global (base de datos → backend → API → frontend).
El orden importa: la SPA necesita la URL pública de la API en tiempo de build.

## Modos de la aplicación

La SPA tiene dos modos controlados por variables de Vite (se inyectan al compilar):

| Modo | Variable | Datos | Escritura |
| --- | --- | --- | --- |
| Desarrollo / servidor propio | `VITE_STATIC_DEMO=false` (default) | API REST en `VITE_API_URL` | CRUD completo |
| Demo pública | `VITE_STATIC_DEMO=true` | Instantánea JSON en `public/data` | Solo lectura |

`VITE_API_URL` sin barra final; si no se define se usa `http://localhost:3000/api/v1`.

# Estado actual del despliegue

- Frontend publicado en **https://valelu611-commits.github.io/la-floresta-sur/**
  (GitHub Pages, workflow `pages.yml`, sin cuentas ni servidores adicionales).
- Build del sitio público con `VITE_STATIC_DEMO=true`: stats, categorías, búsquedas, fichas, mapa y
  agente funcionan solo con archivos JSON incluidos en el sitio. **No depende de tu PC.**
- Para desarrollar con CRUD real: `VITE_STATIC_DEMO=false` y `VITE_API_URL=http://localhost:3000/api/v1`.

## Actualizar la instantánea de datos

```bash
# con backend (:4000) y API (:3000) corriendo en local
npm run data:export
git add public/data && git commit -m "docs: actualizar instantanea de datos publicos"
git push
```

El push dispara GitHub Pages: recompila con los datos nuevos y el link sigue siendo el mismo.

## Opción A — Vercel (recomendada)

```bash
npm i -g vercel
vercel link
vercel env add VITE_API_URL production
vercel --prod
```

El archivo `vercel.json` ya incluye el *rewrite* SPA (`/* -> /index.html`), imprescindible para que
`/categoria/...` y `/detalle/...` no devuelvan 404 al recargar.

## Opción B — Netlify

```bash
npm i -g netlify-cli
netlify init
netlify env:set VITE_API_URL https://<api-publica>/api/v1
netlify deploy --prod
```

`netlify.toml` define build (`npm run build`), carpeta `dist` y el redirect SPA.

## Opción C — Docker + Nginx

```bash
docker build --build-arg VITE_API_URL=https://<api-publica>/api/v1 -t la-floresta-sur-frontend .
docker run --rm -p 8080:80 la-floresta-sur-frontend
```

La imagen es multi-stage: compila con Node 24 y sirve estáticos con Nginx, incluyendo
`try_files ... /index.html` para las rutas del router.

## Opción D — Render (Static Site)

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL`
- Redirect/Rewrite: `/*` → `/index.html` (status 200)

## Verificación posterior

1. Abrir la raíz y comprobar contadores y categorías.
2. Recargar directamente `/mapa` y `/categoria/veterinarias` (deben cargar, no 404).
3. Buscar y abrir un detalle.
4. Abrir el agente y hacer una pregunta.
5. En `/admin`, sin llave debe fallar con `401`; con la llave correcta debe crear un registro.
6. Revisar la consola del navegador: sin errores de CORS (la API debe permitir el dominio del front).

## CORS

La API admite orígenes configurables (`CORS_ORIGINS`). Al desplegar, agrega el dominio del frontend:

```env
CORS_ORIGINS=https://la-floresta-sur.vercel.app,http://localhost:5173
```

## Capas gratuitas sugeridas

| Pieza | Servicio | Plan gratuito |
| --- | --- | --- |
| Frontend | Vercel / Netlify | Hobby / Starter: sitios estáticos ilimitados con HTTPS |
| API | Render / Fly.io | Web Service gratuito (se suspende sin tráfico) |
| Backend | Render | Web Service gratuito con 512 MB |
| Base de datos | Neon / Supabase (PostgreSQL) | 0.5 GB – 500 MB con conexión TLS |

La API y el backend gratuitos se "duermen" tras unos minutos sin uso: la primera petición puede
tardar ~30 s. Sirve para una demo académica; para producción real se recomienda un plan pago.

## Opción G — GitHub Pages (sin cuentas nuevas)

El repo incluye `.github/workflows/pages.yml`. En cada push a `main` compila con
`--base=/la-floresta-sur/` y publica en:

```text
https://valelu611-commits.github.io/la-floresta-sur/
```

Antes de desplegar, define la variable del repositorio (Settings → Secrets and variables →
Actions → Variables → New repository variable):

```text
VITE_API_URL = https://<api-publica>/api/v1
```

Luego vuelve a ejecutar el workflow (Actions → Deploy to GitHub Pages → Run workflow). El router usa
`import.meta.env.BASE_URL` como `basename` y se copia `index.html` a `404.html` para que las rutas
profundas (`/categoria/...`, `/detalle/...`) funcionen al recargar.

## Problemas comunes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| «No se pudo conectar con el servidor» | `VITE_API_URL` mal o API dormida | revisar variable y redeploy; despertar el servicio |
| 404 al recargar una ruta | falta rewrite SPA | usar `vercel.json`/`netlify.toml`/Nginx |
| Mapa en blanco | teselas bloqueadas o CSS de Leaflet | verificar red y `leaflet/dist/leaflet.css` |
| 401 en CRUD | llave distinta a `ADMIN_API_KEY` | usar la misma llave configurada en la API |
| Acentos rotos | codificación del servidor | servir con `charset=utf-8` (Nginx ya lo hace) |
