import { ApiError } from "./httpError";
import { loadResource } from "./localData";
import type { Entity, Page, ResourceName } from "./types";

export async function localList(
  resource: ResourceName,
  params: Record<string, string | number | undefined>,
): Promise<Page<Entity>> {
  const page = await loadResource(resource);
  let items = page.data;

  const category = params.category;
  if (typeof category === "string" && category) {
    items = items.filter((entity) => entity.categorySlug === category);
  }

  const q = String(params.q ?? "").trim().toLowerCase();
  if (q) {
    items = items.filter((entity) => Object.values(entity).join(" ").toLowerCase().includes(q));
  }

  const limit = Number(params.limit ?? 50);
  const offset = Number(params.offset ?? 0);
  return {
    data: items.slice(offset, offset + limit),
    meta: { total: items.length, limit, offset },
  };
}

export async function localGet(resource: ResourceName, id: string): Promise<{ data: Entity }> {
  const page = await loadResource(resource);
  const entity = page.data.find((item) => String(item.id) === String(id));
  if (!entity) throw new ApiError(404, "Registro no encontrado en la instantanea.");
  return { data: entity };
}
