import type { ResourceName } from "./types";

export const ADMIN_RESOURCES: Array<{ key: ResourceName; label: string }> = [
  { key: "places", label: "Lugares y Servicios" },
  { key: "security-incidents", label: "Hechos de Seguridad" },
  { key: "road-segments", label: "Tramos Viales" },
  { key: "cadastral-properties", label: "Predios Catastrales" },
  { key: "localities", label: "Fichas Localidad" },
];

/** Campo que hace de titulo visible segun el recurso. */
export function titleFieldFor(resource: ResourceName): string {
  if (resource === "security-incidents") return "title";
  if (resource === "cadastral-properties") return "address";
  return "name";
}

export function entityLabel(entity: Record<string, unknown>, fallback: string): string {
  return String(entity.name ?? entity.title ?? entity.address ?? fallback);
}

export const ADMIN_KEY_STORAGE = "lf_admin_key";
export const DEFAULT_ADMIN_KEY = "dev-admin-key";
