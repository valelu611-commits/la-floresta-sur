import { CATEGORY_NAMES } from "./categories";
import { entityToHit } from "./entities";
import { ALL_RESOURCES, loadResource } from "./localData";
import type { Entity, SearchHit, SearchResponse } from "./types";

function matches(entity: Entity, hit: SearchHit, tokens: string[]): boolean {
  const text = `${Object.values(entity).join(" ")} ${hit.title} ${
    CATEGORY_NAMES[hit.categorySlug] ?? ""
  }`.toLowerCase();
  return tokens.every((token) => text.includes(token));
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
