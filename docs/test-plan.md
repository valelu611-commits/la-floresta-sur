# Plan y modelo de pruebas — frontend

Estrategia de la **pirámide de pruebas**: mucha unidad sobre `lib/`, integración de componentes con
Testing Library y una verificación manual del flujo completo entre los tres repositorios.

## Herramientas

- **Vitest** como runner (entorno `jsdom`).
- **@testing-library/react** + `user-event`/`fireEvent` para interacción.
- **@testing-library/jest-dom** para matchers de accesibilidad y estilos.
- `fetch` se sustituye con `vi.stubGlobal`, sin red real.

## Comando

```bash
npm test          # una corrida (lo que ejecuta CI)
npm run test:watch
npm run verify    # check:size + typecheck + test
```

## Casos automatizados

| Archivo | Objetivo | Casos |
| --- | --- | --- |
| `tests/api.test.ts` | Cliente HTTP | query string de búsqueda, cabecera `x-admin-key`, omisión de parámetros vacíos, `ApiError` 401, fallo de conexión (status 0) |
| `tests/SearchHero.test.tsx` | Buscador principal | navega con texto, ignora vacío, ideas rápidas |
| `tests/AgentChat.test.tsx` | Agente de IA | saludo, envío y render de respuesta, error de API |
| `tests/CategoryCard.test.tsx` | Tarjeta temática | enlace correcto, nombre/descripción/contador |
| `tests/Badge.test.tsx` | Insignia | texto y color aplicado |
| `tests/entities.test.ts` | Mapeo de datos | `entityToHit` por recurso, categoría por defecto, títulos/subtítulos, formato numérico |
| `tests/localDemo.test.ts` | Demo estática | búsqueda en la instantánea, filtro por categoría, agente local sin servidor |

Cobertura esperada: rutas críticas de datos y componentes con lógica condicional. Las vistas que solo
componen se validan manualmente en el checklist.

## Checklist manual (caja negra)

1. **Inicio**: carga contadores reales, las 13 categorías y un mapa con pines.
2. **Búsqueda**: `veterinarias` devuelve resultados y el mapa centra los pines; sin resultados muestra
   estado vacío.
3. **Categoría**: `/categoria/seguridad` lista hechos, CAI y cámaras con badge rojo.
4. **Detalle**: al tocar un pin o una tarjeta se abre `/detalle/...` con todos los campos.
5. **Mapa**: activar/desactivar capas cambia el número de pines.
6. **Agente**: el botón flotante abre el chat en cualquier vista; responde y muestra enlaces.
7. **CRUD**: en `/admin`, sin llave la API responde `401`; con llave se crea, edita y elimina.
8. **Responsive**: 360 px, 768 px y 1440 px sin solapamientos.
9. **Errores**: con la API apagada aparece `ErrorState` y el botón «Reintentar».
10. **Accesibilidad**: inputs con `aria-label`, botones con nombre accesible, foco visible.

## Datos de prueba

Las pruebas no dependen de la base de datos: usan objetos literales con la forma del contrato
(`SearchHit`, `Category`, `AgentAnswer`). Así siguen funcionando aunque cambie la semilla.

## Integración real (smoke test)

```bash
# 1. backend
cd la-floresta-sur-backend && npm run db:migrate && npm run db:seed && npm run dev
# 2. api
cd la-floresta-sur-api && npm run dev
# 3. frontend
cd la-floresta-sur-frontend && npm run dev      # con la API y el backend arriba
```

Verificar: `GET /api/v1/health`, `GET /api/v1/stats`, y una búsqueda desde la UI.
