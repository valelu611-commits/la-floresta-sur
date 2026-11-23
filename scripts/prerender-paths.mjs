// Crea index.html en cada ruta conocida para que GitHub Pages responda 200.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const dataDir = join(root, "public", "data");
const resources = [
  "places",
  "security-incidents",
  "road-segments",
  "cadastral-properties",
  "localities",
];

function readData(name) {
  return JSON.parse(readFileSync(join(dataDir, `${name}.json`), "utf8"));
}

const paths = ["mapa", "explorar", "admin", "acerca"];
for (const category of readData("categories").data) {
  paths.push(`categoria/${category.slug}`);
}
for (const resource of resources) {
  for (const entity of readData(resource).data) {
    paths.push(`detalle/${resource}/${entity.id}`);
  }
}

for (const path of paths) {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  copyFileSync(join(dist, "index.html"), join(dir, "index.html"));
}

console.log(`Rutas estaticas creadas: ${paths.length}`);
