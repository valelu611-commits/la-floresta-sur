# Despliegue público — frontend

Este es el **cuarto y último** paso de la guía global (base de datos → backend → API → frontend).
El orden importa: la SPA necesita la URL pública de la API en tiempo de build.

## Requisito: `VITE_API_URL`

Vite inyecta las variables en el momento de compilar. Define:

```env
VITE_API_URL=https://<api-publica>/api/v1
```

Sin barra final. Si no se define, el build usa `http://localhost:3000/api/v1`.

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

## Problemas comunes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| «No se pudo conectar con el servidor» | `VITE_API_URL` mal o API dormida | revisar variable y redeploy; despertar el servicio |
| 404 al recargar una ruta | falta rewrite SPA | usar `vercel.json`/`netlify.toml`/Nginx |
| Mapa en blanco | teselas bloqueadas o CSS de Leaflet | verificar red y `leaflet/dist/leaflet.css` |
| 401 en CRUD | llave distinta a `ADMIN_API_KEY` | usar la misma llave configurada en la API |
| Acentos rotos | codificación del servidor | servir con `charset=utf-8` (Nginx ya lo hace) |
