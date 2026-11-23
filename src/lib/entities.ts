import { entitySubtitle, entityTitle } from "./format";
import type { Entity, ResourceName, SearchHit } from "./types";

const RESOURCE_CATEGORY: Record<ResourceName, string> = {
  places: "comida",
  "security-incidents": "seguridad",
  "road-segments": "malla-vial",
  "cadastral-properties": "catastral",
  localities: "localidad",
};

export function entityToHit(resource: ResourceName, entity: Entity): SearchHit {
  const categorySlug =
    resource === "places" ? String(entity.categorySlug ?? "comida") : RESOURCE_CATEGORY[resource];
  return {
    id: String(entity.id ?? ""),
    resource,
    categorySlug,
    title: entityTitle(resource, entity),
    subtitle: entitySubtitle(resource, entity),
    lat: Number(entity.lat ?? 0),
    lon: Number(entity.lon ?? 0),
  };
}

export function humanizeKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").replaceAll("_", " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

export function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Si" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
