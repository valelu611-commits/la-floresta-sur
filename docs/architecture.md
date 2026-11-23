# Arquitectura del frontend

El frontend es la capa de presentación del sistema **La Floresta Sur**. Consume únicamente el
contrato REST de `la-floresta-sur-api`; nunca habla directo con la base de datos.

## 1. Capas internas

```text
pages/        vistas por ruta (composición)
components/   UI reutilizable y accesible
hooks/        estado remoto (useApi)
lib/          cliente HTTP, tipos, catálogo de categorías, formato
```

Regla de dependencia: `pages -> components -> lib`. Ningún archivo de `lib/` importa componentes.

## 2. Diagrama de despliegue

```mermaid
graph TD
  U["Usuario (navegador)"] -->|HTTPS| CDN["Hosting estático<br/>Vercel · Netlify · Nginx"]
  CDN -->|archivos dist/| SPA["SPA React + Leaflet"]
  SPA -->|REST/JSON| API["la-floresta-sur-api<br/>Express + Zod"]
  API -->|HTTP interno| BE["la-floresta-sur-backend<br/>dominio + ORM"]
  BE --> PG[("PostgreSQL/PostGIS")]
  BE --> MY[("MySQL")]
  BE --> SQ[("SQLite/SpatiaLite")]
  SPA -->|teselas| CARTO["CARTO basemaps"]
  SPA -->|preguntas| API
```

## 3. Diagrama de componentes

```mermaid
graph LR
  subgraph App
    Router["React Router 7"]
    Layout["Layout + Navbar + Footer"]
    Agent["AgentWidget + AgentChat"]
  end
  subgraph Pages
    Home["HomePage"]
    Explore["ExplorePage"]
    Category["CategoryPage"]
    Detail["DetailPage"]
    MapPage["MapPage"]
    Admin["AdminPage"]
  end
  subgraph Reuse
    Search["SearchHero"]
    Cards["CategoryCard / HitCard"]
    MapView["MapView (Leaflet)"]
    States["Loading / ErrorState / EmptyState"]
  end
  subgraph Data
    ApiClient["lib/api.ts"]
    Types["lib/types.ts"]
    Cats["lib/categories.ts"]
    Hook["hooks/useApi.ts"]
  end
  Router --> Pages
  Pages --> Reuse
  Pages --> Hook
  Hook --> ApiClient
  ApiClient --> Types
  Reuse --> Cats
  Layout --> Agent
  Agent --> ApiClient
  Category --> MapView
  Explore --> MapView
  MapPage --> MapView
  Detail --> MapView
```

## 4. Diagrama de clases (cliente)

```mermaid
classDiagram
  class ApiClient {
    +string API_BASE
    +stats() Stats
    +categories() Category[]
    +search(q, limit) SearchResponse
    +ask(question) AgentAnswer
    +list(resource, params) Page~Entity~
    +get(resource, id) Entity
    +create(resource, body, key) Entity
    +update(resource, id, body, key) Entity
    +remove(resource, id, key) void
  }
  class ApiError {
    +number status
    +string message
  }
  class ApiState~T~ {
    +T data
    +boolean loading
    +string error
    +reload() void
  }
  class SearchHit {
    +string id
    +ResourceName resource
    +string title
    +string subtitle
    +string categorySlug
    +number lat
    +number lon
  }
  class Category {
    +string slug
    +string name
    +ResourceName resource
    +string color
    +string icon
    +number count
  }
  class AgentAnswer {
    +string question
    +string answer
    +string generatedBy
    +string[] intents
    +AgentGroup[] groups
  }
  ApiClient ..> ApiError : lanza
  ApiClient ..> SearchHit
  ApiClient ..> Category
  ApiClient ..> AgentAnswer
  useApi ..> ApiState
```

## 5. Secuencia: búsqueda

```mermaid
sequenceDiagram
  actor U as Usuario
  participant S as SearchHero
  participant R as Router
  participant P as ExplorePage
  participant A as api
  participant API as API REST
  U->>S: escribe "veterinarias" y envía
  S->>R: navigate("/explorar?q=veterinarias")
  R->>P: monta ExplorePage
  P->>A: search("veterinarias", 30)
  A->>API: GET /api/v1/search?q=...&limit=30
  API-->>A: { hits, countsByCategory }
  A-->>P: SearchResponse
  P-->>U: lista de HitCard + pines en el mapa
```

## 6. Secuencia: CRUD administrativo

```mermaid
sequenceDiagram
  actor U as Administrador
  participant P as AdminPage
  participant A as api
  participant API as API REST
  participant BE as Backend
  participant DB as Base de datos
  U->>P: completa formulario + llave
  P->>A: create(resource, body, adminKey)
  A->>API: POST /api/v1/places (x-admin-key)
  API->>API: valida con Zod (strict)
  API->>BE: POST /internal/places
  BE->>DB: INSERT validado por repositorio
  DB-->>BE: registro creado
  BE-->>API: { data }
  API-->>A: 201 { data }
  A-->>P: registro creado
  P->>P: recarga el listado
  P-->>U: mensaje de éxito
```

## 7. Secuencia: agente de IA

```mermaid
sequenceDiagram
  actor U as Usuario
  participant W as AgentWidget
  participant C as AgentChat
  participant A as api
  participant API as API REST
  participant BE as Backend (agente)
  U->>W: toca "Pregúntale a la IA"
  U->>C: escribe una pregunta
  C->>A: ask(question)
  A->>API: POST /api/v1/agent/ask
  API->>BE: POST /internal/agent/ask
  BE->>BE: detecta intenciones (reglas + LLM opcional)
  BE-->>API: respuesta + grupos de resultados
  API-->>A: AgentAnswer
  A-->>C: texto en markdown simple
  C-->>U: burbuja del agente
```

## 8. Decisiones de diseño

- **Un solo endpoint base** (`VITE_API_URL`): la SPA no conoce detalles del backend.
- **useApi** centraliza carga, error y recarga; las páginas no repiten `useEffect`.
- **Catálogo de categorías** (`lib/categories.ts`) desacopla iconos/colores del backend y sirve de
  respaldo si `/categories` falla.
- **Mapa único** (`MapView`) recibe `SearchHit[]`, así sirve para búsquedas, categorías, detalle y
  la vista de capas.
- **Agente flotante** vive en `Layout`, por lo que está presente en todas las vistas.
