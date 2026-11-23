// Exporta una instantanea de la API a public/data para la demo publica estatica.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = (process.env.API_URL ?? "http://localhost:3000/api/v1").replace(/\/$/, "");
const outDir = join(process.cwd(), "public", "data");
const resources = [
  "places",
  "security-incidents",
  "road-segments",
  "cadastral-properties",
  "localities",
];

mkdirSync(outDir, { recursive: true });

async function get(path, file) {
  const response = await fetch(`${base}${path}`);
  if (!response.ok) throw new Error(`No se pudo exportar ${path}: ${response.status}`);
  const payload = await response.json();
  writeFileSync(join(outDir, file), `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`OK ${file}`);
}

await get("/stats", "stats.json");
await get("/categories", "categories.json");
for (const resource of resources) {
  await get(`/${resource}?limit=100`, `${resource}.json`);
}

console.log(`Instantanea lista en ${outDir}`);
