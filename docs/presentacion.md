# Guion de exposición — La Floresta Sur (5 a 10 minutos)

Este documento está listo para grabar. Incluye **qué decir**, **qué mostrar en pantalla** y **cuánto tiempo** dedicale a cada parte. El texto entre comillas es literal; puedes leerlo casi tal cual.

## Datos clave para no equivocarte

| Dato | Valor |
| --- | --- |
| Barrio | La Floresta Sur, UPZ 79 Caldas, localidad de Kennedy, Bogotá |
| Coordenadas del centro | 4.6112, -74.1508 |
| Link público | https://valelu611-commits.github.io/la-floresta-sur/ |
| Repositorios | `la-floresta-sur` (web), `la-floresta-sur-api`, `la-floresta-sur-backend` |
| Categorías | 13 |
| Registros en la demo | 62 |
| Pruebas automatizadas | 66 (23 web + 19 API + 24 backend) |
| Límite de código | 100 líneas por archivo |
| Mapa | Leaflet + teselas de Esri, sin API key |

## Antes de grabar

- [ ] Abre el link público en el navegador.
- [ ] Ten abiertas las tres páginas de GitHub en otras pestañas.
- [ ] Ten este guion en una segunda pantalla o impreso.
- [ ] Si se cae el internet, ten 3 capturas: inicio, mapa y agente.
- [ ] Apaga notificaciones y pon el navegador en pantalla completa.

## Mapa de la charla

| Tiempo | Bloque |
| --- | --- |
| 0:00 – 0:25 | Portada |
| 0:25 – 1:30 | El problema y los requerimientos |
| 1:30 – 2:30 | Arquitectura general |
| 2:30 – 3:30 | Backend y base de datos |
| 3:30 – 4:20 | API REST |
| 4:20 – 5:20 | Frontend y librerías |
| 5:20 – 7:40 | Demo en vivo |
| 7:40 – 8:40 | Pruebas y calidad |
| 8:40 – 9:40 | Despliegue público |
| 9:40 – 10:00 | Cierre |

---

## 1. Portada (0:00 – 0:25)

**Pantalla:** el inicio de la web pública.

> «Hola, soy [tu nombre]. Hoy les presento **La Floresta Sur**: una aplicación web pública para explorar, buscar y entender los datos de este barrio de Kennedy, en Bogotá. La puede abrir cualquier persona con un link, desde cualquier dispositivo, sin cuenta y sin instalar nada.»

**Transición:** «Empecemos por el problema que quería resolver.»

---

## 2. El problema y los requerimientos (0:25 – 1:30)

**Pantalla:** diapositiva con 4 bullets o las 13 tarjetas de categorías de la web.

> «Si alguien quiere saber dónde hay una veterinaria, cómo está una calle, cuál es el estrato de un predio o si hay un CAI cerca, la información suele estar dispersa. Entonces me propuse reunirla en un solo lugar.»

> «Los requerimientos fueron siete: primero, **trece categorías** obligatorias —seguridad, malla vial, catastro, librerías, CAI, cámaras, comida, veterinarias, localidad, zonas verdes, transporte, deporte y educación—. Segundo, **búsqueda central** apenas entra la persona. Tercero, un **mapa interactivo**. Cuarto, un **asistente de IA** visible en todas las vistas. Quinto, **CRUD completo**, o sea crear, leer, actualizar y borrar, con validación. Sexto, una **arquitectura por capas** aplicando SOLID. Y séptimo, un **link público** que funcionara aunque yo apagara la computadora.»

> «Y una regla de diseño que me puse: **ningún archivo de código podía superar las 100 líneas**. Si crecía, lo dividía en módulos más pequeños.»

**Transición:** «Para lograrlo separé el proyecto en tres repositorios.»

---

## 3. Arquitectura general (1:30 – 2:30)

**Pantalla:** este diagrama simple (puedes dibujarlo o ponerlo en una diapositiva):

```text
[Web React]  →  [API REST]  →  [Backend + ORM]  →  [SQLite / PostgreSQL / MySQL]
```

> «La arquitectura tiene tres capas. La **web** es la que ve el usuario: React, el mapa y los botones. La **API** es la puerta de entrada: valida lo que llega, aplica seguridad y decide a qué servicio llamar. El **backend** es el cerebro: tiene las reglas de negocio, los servicios y el ORM. El ORM es como un traductor entre los objetos de TypeScript y las tablas de la base de datos.»

> «Cada capa vive en su propio repositorio público: `la-floresta-sur`, `la-floresta-sur-api` y `la-floresta-sur-backend`. Están separados para que cada uno pueda cambiar sin romper a los demás. Por ejemplo, mañana puedo cambiar el diseño de la web sin tocar la base de datos.»

> «Y algo importante: la versión pública que ves acá es **estática**. Incluye una instantánea de los datos dentro del propio sitio, así que no necesita servidor. Más adelante les muestro cómo funciona eso.»

**Transición:** «Arranquemos por la capa más interna, el backend.»

---

## 4. Backend y base de datos (2:30 – 3:30)

**Pantalla:** estructura `src/` del repo backend o el diagrama de clases de `docs/architecture.md`.

> «El backend está hecho en Node.js 24 y TypeScript. Tiene tres ideas clave. La primera son los **puertos**, que son como contratos: definen qué debe saber hacer un repositorio sin decir cómo lo hace. La segunda es el **ORM**: una clase genérica `SqlCrudRepository` implementa crear, listar, buscar, actualizar y borrar. Y la tercera son los **adaptadores**: hay uno para SQLite, otro para PostgreSQL/PostGIS y otro para MySQL.»

> «Gracias a esos contratos, la lógica de negocio no importa si la base es SQLite, PostgreSQL o MySQL. Solo se cambia el adaptador al iniciar la aplicación. Eso es el principio de inversión de dependencias de SOLID. También hay migraciones, semillas con datos realistas, servicios de búsqueda y estadísticas, y un agente que responde con reglas y, si se configura, con un modelo de lenguaje.»

> «Para la demo local uso SQLite, que es un archivo, no necesita instalar un servidor. Los scripts de PostGIS y MySQL también están incluidos.»

**Transición:** «Ahora, ¿cómo se expone todo eso al exterior? Con la API.»

---

## 5. API REST (3:30 – 4:20)

**Pantalla:** `docs/api-contract.md` del repo API.

> «La API es un servicio Express en TypeScript. Expone rutas REST bajo `/api/v1`: `/places`, `/security-incidents`, `/road-segments`, `/cadastral-properties`, `/localities`, además de `/search`, `/stats`, `/categories` y `/agent/ask`. Todas devuelven JSON con una forma predecible: `data` y `meta`.»

> «Antes de pasar cualquier petición al backend, valida con **Zod**. Zod es una librería que revisa que los campos tengan el tipo y el tamaño correcto, y rechaza campos extra. Las escrituras piden una cabecera `x-admin-key`, comparada de forma segura. También usa Helmet, CORS configurable y límite de peticiones.»

> «Y algo que me gustó mucho: la API habla con el backend a través de un puerto `BackendPort`. En las pruebas uso un backend falso, así que puedo testear la API sin levantar la base de datos.»

**Transición:** «Y llegamos a la parte visible: la web.»

---

## 6. Frontend y librerías (4:20 – 5:20)

**Pantalla:** la web en modo escritorio y el repo `la-floresta-sur`.

> «El frontend usa **React 19** con **Vite 6** para compilar rápido. El enrutador es **React Router 7**, que permite tener direcciones como `/categoria/veterinarias`. El diseño es con **Tailwind CSS**, una librería de estilos que deja el CSS dentro del mismo componente: de ahí salen las tarjetas, los badges de color y el modo oscuro con neones. Los iconos vienen de **lucide-react**.»

> «El mapa usa **Leaflet 1.9** con **react-leaflet 5**. Leaflet es la librería que dibuja el mapa, los pines y los popups. Las teselas —los pedacitos de mapa— vienen de Esri y **no necesitan API key**, así que cualquiera puede ver las calles. Cada categoría tiene su color y su icono, y eso se usa tanto en las tarjetas como en los pines.»

> «El asistente flotante está en el layout, por lo que aparece en **todas** las vistas. El cliente de API centraliza las llamadas y, cuando el sitio se compila en modo público, lee los JSON incluidos en vez de llamar a un servidor. Así la web sigue funcionando con mi PC apagada.»

**Transición:** «Les hago una demostración rápida de todo esto.»

---

## 7. Demo en vivo (5:20 – 7:40)

**Importante:** haz los clics despacio y narra cada paso.

**Pantalla:** link público.

> «Esto es lo que ve cualquier persona al abrir el link. Arriba está el buscador central, abajo las 13 categorías y el mapa. Fíjense en los contadores: 62 registros y 13 categorías.»

**Acción 1:** escribe `veterinarias` y dale Enter.

> «Busco “veterinarias”. Aparecen 4 resultados con su dirección y sus coordenadas. A la derecha, los mismos resultados como pines en el mapa.»

**Acción 2:** toca la categoría **Veterinarias** en los filtros rápidos.

> «Si entro por categoría, veo el listado filtrado, el color verde de la categoría y el mapa con esos 4 puntos. Lo mismo funciona para las otras 12 categorías.»

**Acción 3:** abre el **Mapa** y activa «Predios catastrales».

> «En la vista de mapa puedo prender y apagar capas. Al activar predios, los pines pasan de 52 a 60. Cada pin tiene un popup con el detalle.»

**Acción 4:** toca una tarjeta para abrir el detalle.

> «En el detalle se ven todos los campos del registro y su ubicación exacta. Desde acá también se puede llegar a editar, cuando se trabaja con la API local.»

**Acción 5:** abre el botón flotante de IA y pregunta «¿Dónde hay veterinarias?».

> «Y finalmente el asistente. Le pregunto por veterinarias y me responde con las 4 del barrio. También entiende sinónimos: si busco “parques”, encuentra las zonas verdes; si digo “robos”, encuentra seguridad.»

**Acción 6:** abre **Administrar**.

> «En modo público el panel es de solo lectura: si intento crear algo, la web me dice amablemente “modo público de solo lectura”. El CRUD completo —crear, editar y borrar— se usa en local con la API, y quedó documentado en los repos.»

**Transición:** «Todo eso está respaldado por pruebas.»

---

## 8. Pruebas y calidad (7:40 – 8:40)

**Pantalla:** terminal con `npm run verify` o la pestaña Actions de GitHub.

> «En total hay **66 pruebas automatizadas**: 23 en la web, 19 en la API y 24 en el backend. Usamos Vitest y Testing Library. Las pruebas simulan el navegador y las respuestas de la API, así que no dependen de internet ni de la base de datos.»

> «Además, un script revisa que ningún archivo supere las 100 líneas. Hoy tenemos más de 60 archivos entre código, scripts y pruebas, y todos cumplen. Y en cada push a `main`, GitHub Actions corre el chequeo de tamaño, TypeScript, las pruebas y el build. Si algo falla, el check sale rojo.»

> «Esto me obligó a dividir el código en módulos pequeños: por ejemplo, el formulario del CRUD se partió en componentes de categoría, coordenadas, lista y configuración.»

**Transición:** «Y ahora la parte que más me importaba: que sea público de verdad.»

---

## 9. Despliegue público (8:40 – 9:40)

**Pantalla:** el link público y la pestaña de GitHub Pages del repo.

> «El frontend se publica con **GitHub Pages**, que es gratis. El repositorio se llama `la-floresta-sur`, por eso la dirección es `valelu611-commits.github.io/la-floresta-sur`. En cada push, un workflow compila la web, genera páginas estáticas para las 79 rutas conocidas y las publica.»

> «El truco está en una variable: `VITE_STATIC_DEMO=true`. Con eso, la web lee una instantánea de los datos que vive en `public/data` en lugar de llamar a un servidor. Por eso funciona con mi PC apagada y por eso no aparece el error de conexión. Las teselas del mapa vienen de Esri, tampoco requieren clave.»

> «Si los datos cambian, corro `npm run data:export`, hago commit y push, y GitHub Pages se actualiza solo. El link nunca cambia. Para los curiosos: las rutas profundas —por ejemplo `/categoria/seguridad`— tienen su propio `index.html` generado, así que responden 200 y no marcan error.»

**Transición:** «Para terminar, un resumen.»

---

## 10. Cierre (9:40 – 10:00)

**Pantalla:** portada de la web o diapositiva final con el link.

> «En resumen: construí una aplicación pública de tres capas, con 13 categorías y 62 registros del barrio, búsqueda, mapa y agente de IA. Apliqué SOLID con puertos y adaptadores para poder cambiar de base de datos sin tocar la lógica. La acompañé de 66 pruebas, una regla de 100 líneas por archivo y documentación con UML. Y lo más importante: el link funciona para cualquier persona, en cualquier dispositivo, sin depender de mi computadora.»

> «Muchas gracias. El link está en la descripción y los tres repositorios son públicos. ¿Preguntas?»

---

## Preguntas que te pueden hacer (y respuestas cortas)

**¿Por qué tres repositorios y no uno?**
Porque cada capa puede evolucionar sola. El frontend cambia de diseño, la API cambia de validaciones y el backend cambia de base de datos sin mezclarse.

**¿Por qué SQLite si mencionas PostgreSQL?**
SQLite es cómodo para la demo local: es un archivo. Pero el código usa interfaces, y existen adaptadores para PostgreSQL/PostGIS y MySQL. Cambiar de motor no cambia los servicios.

**¿Qué es SOLID en palabras simples?**
Cinco reglas para que el código sea fácil de cambiar. La que más apliqué fue "depende de contratos, no de implementaciones": el servicio no sabe si usa SQLite o PostgreSQL.

**¿Qué es un ORM?**
Un traductor: convierte objetos de TypeScript en filas de una tabla y viceversa. Así no escribo SQL a mano para cada operación.

**¿El agente usa inteligencia artificial real?**
Por defecto usa reglas: detecta palabras clave y devuelve los registros relacionados. También está preparado para conectarse a un modelo de lenguaje si se configura una clave.

**¿Necesito pagar algo o crear una cuenta para ver la web?**
No. GitHub Pages es gratis, las teselas son gratis y no hay login.

**¿Qué pasa si se apaga tu PC?**
Nada en la web pública: los datos están incluidos en el sitio. Solo se pierde el CRUD en vivo, que es una herramienta de desarrollo.

**¿Cómo actualizas los datos?**
Exporto una instantánea con `npm run data:export`, hago push y GitHub Pages vuelve a publicar. El link no cambia.

**¿Qué es una ruta profunda?**
Un link directo a una página interna, como `/categoria/seguridad`. Como generamos un `index.html` para cada una, abre sin error.

---

## Tips para la grabación

- No lees palabras por palabras: mira la cámara, lee una frase y vuelve a mirar.
- Haz pausas de un segundo después de cada dato importante (62 registros, 13 categorías, 66 pruebas).
- Si la demo falla, no te detengas: di «en la documentación está el paso a paso» y sigue.
- Ten el mouse quieto cuando hables; muévelo solo para la acción que vas a explicar.
- Si te sobra tiempo, muestra el diagrama Mermaid de `docs/architecture.md` del repo frontend.
- Si te falta tiempo, recorta la sección de pruebas a 30 segundos y deja la demo completa.
