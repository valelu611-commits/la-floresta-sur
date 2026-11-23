# la-floresta-sur-frontend

Aplicación web pública para **explorar, buscar y gestionar** los datos del barrio
**La Floresta Sur** (UPZ 79 Caldas, localidad de Kennedy, Bogotá).

Interfaz vibrante, buscador central al entrar, mapa interactivo con pines por categoría y un
**agente de IA flotante** disponible en todas las vistas.

> Demo académica: los datos son ilustrativos y aproximados; no sustituyen fuentes oficiales.

## Demo pública

**https://valelu611-commits.github.io/la-floresta-sur-frontend/**

Incluye las 13 categorías, mapa con teselas de Esri (sin clave), buscador y agente de IA.
Los datos vienen de la API publicada con un túnel gratuito de Cloudflare mientras la máquina local
sigue encendida. Para un despliegue permanente, sigue [`docs/deployment.md`](docs/deployment.md).

## Rol en la arquitectura de 3 capas

```text
[Este repo] Frontend React  ->  la-floresta-sur-api (REST/Zod)  ->  la-floresta-sur-backend (dominio + ORM)  ->  PostgreSQL/PostGIS | MySQL | SQLite
```

- `la-floresta-sur-frontend`: interfaz de usuario (este repositorio).
- [`la-floresta-sur-api`](https://github.com/valelu611-commits/la-floresta-sur-api): contrato REST, validación y seguridad.
- [`la-floresta-sur-backend`](https://github.com/valelu611-commits/la-floresta-sur-backend): reglas de negocio, ORM y base de datos.

## Stack

- React 19 + TypeScript + Vite 6
- React Router 7 (SPA con rutas amigables)
- Tailwind CSS 3 con paleta neón de alto contraste
- Leaflet 1.9 + react-leaflet 5 (teselas oscuras de CARTO)
- lucide-react para iconografía
- Vitest + Testing Library

## Rutas de la aplicación

| Ruta | Vista |
| --- | --- |
| `/` | Inicio con buscador, 13 categorías y mapa resumen |
| `/explorar?q=` | Búsqueda transversal con resultados + mapa |
| `/categoria/:slug` | Listado temático con mapa y contador |
| `/detalle/:resource/:id` | Ficha completa de un registro |
| `/mapa` | Mapa a pantalla amplia con capas activables |
| `/admin` | CRUD con llave de administrador |
| `/acerca` | Contexto del proyecto y de la arquitectura |

## Inicio rápido

```bash
npm install
cp .env.example .env        # ajusta VITE_API_URL
npm run dev                 # http://localhost:5173
```

Necesitas la API y el backend corriendo:

```bash
# terminal 1 - backend (http://localhost:4000)
cd la-floresta-sur-backend && npm install && npm run db:migrate && npm run db:seed && npm run dev

# terminal 2 - API (http://localhost:3000)
cd la-floresta-sur-api && npm install && npm run dev
```

## Variables de entorno

| Variable | Obligatoria | Ejemplo |
| --- | --- | --- |
| `VITE_API_URL` | sí (en producción) | `https://la-floresta-sur-api.onrender.com/api/v1` |

En desarrollo, si no se define, se usa `http://localhost:3000/api/v1`.

Las variables de Vite se **inyectan en build**: cambia `VITE_API_URL` y vuelve a compilar.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Typecheck + build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm test` | Pruebas con Vitest |
| `npm run typecheck` | TypeScript estricto sin emitir |
| `npm run check:size` | Verifica el límite de 100 líneas por archivo |
| `npm run verify` | Tamaño + tipos + pruebas (lo que corre CI) |

## Regla de las 100 líneas

Ningún archivo de `src/`, `scripts/` o `tests/` supera **100 líneas**. Cuando una vista crece se
extraen componentes (`src/components/home/*`), utilidades (`src/lib/*`) o hooks (`src/hooks/*`).

## Estructura

```text
src/
  components/     UI reutilizable (Badge, HitCard, MapView, AgentChat, Layout...)
  components/home/  secciones de la portada
  pages/          una vista por ruta
  lib/            cliente de API, tipos, categorías, formato
  hooks/          useApi (carga remota con recarga y error)
  test/           setup de Vitest
tests/            pruebas de componentes y del cliente API
docs/             arquitectura/UML, plan de pruebas y guía de despliegue
```

## Pruebas

```bash
npm test
```

Cubren el cliente HTTP (query strings, cabecera `x-admin-key`, errores), el buscador, la tarjeta de
categoría, la insignia y el chat del agente (éxito y fallo). Detalle en
[`docs/test-plan.md`](docs/test-plan.md).

## Despliegue público

```bash
npm run build
# publica dist/ en Vercel, Netlify o cualquier hosting estático
```

Guía completa (Docker, Vercel, Netlify, variables y orden de despliegue):
[`docs/deployment.md`](docs/deployment.md).

## Documentación

- [`docs/architecture.md`](docs/architecture.md): capas y UML en Mermaid.
- [`docs/test-plan.md`](docs/test-plan.md): modelo de pruebas ejecutable.
- [`docs/deployment.md`](docs/deployment.md): guía de despliegue público.

## Licencia

MIT · 2026
