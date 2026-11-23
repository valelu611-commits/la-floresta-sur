import { CATEGORY_NAMES } from "./categories";
import { entityToHit } from "./entities";
import { ALL_RESOURCES, loadResource } from "./localData";
import type { Entity, SearchHit, SearchResponse } from "./types";

/** Sinonimos comunes -> categoria, para buscar "parques" y encontrar "Zonas verdes". */
const SLUG_BY_WORD: Record<string, string> = {
  parque: "zonas-verdes",
  parques: "zonas-verdes",
  verde: "zonas-verdes",
  robos: "seguridad",
  robo: "seguridad",
  hurto: "seguridad",
  bus: "transporte",
  transmilenio: "transporte",
  transportes: "transporte",
  camara: "camaras",
  camaras: "camaras",
  restaurantes: "comida",
  comidas: "comida",
  veterinaria: "veterinarias",
  mascotas: "veterinarias",
  colegios: "educacion",
  educacion: "educacion",
  canchas: "deportes",
  deporte: "deportes",
  estrato: "catastral",
  predios: "catastral",
  calles: "malla-vial",
  huecos: "malla-vial",
};

function matches(entity: Entity, hit: SearchHit, tokens: string[]): boolean {
  const text = `${Object.values(entity).join(" ")} ${hit.title} ${
    CATEGORY_NAMES[hit.categorySlug] ?? ""
  }`.toLowerCase();
  return tokens.every((token) => {
    if (text.includes(token)) return true;
    const slug = SLUG_BY_WORD[token];
    return slug ? text.includes((CATEGORY_NAMES[slug] ?? "").toLowerCase()) : false;
  });
}

export async function localSearch(q: string, limit = 12): Promise<SearchResponse> {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits: SearchHit[] = [];

  for (const resource of ALL_RESOURCES) {
    const page = await loadResource(resource);
    page.data.forEach((entity) => {
      const hit = entityToHit(resource, entity);
      if (matches(entity, hit, tokens)) hits.push(hit);
    });
  }

  const countsByCategory: Record<string, number> = {};
  for (const hit of hits) {
    countsByCategory[hit.categorySlug] = (countsByCategory[hit.categorySlug] ?? 0) + 1;
  }

  return {
    query: q,
    total: hits.length,
    hits: hits.slice(0, limit),
    countsByCategory,
  };
}
