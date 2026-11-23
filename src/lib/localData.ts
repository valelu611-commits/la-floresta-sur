import type { Category, Entity, Page, ResourceName, Stats } from "./types";

const cache = new Map<string, Promise<unknown>>();

function load<T>(file: string): Promise<T> {
  let pending = cache.get(file);
  if (!pending) {
    pending = fetch(`${import.meta.env.BASE_URL}data/${file}.json`).then((response) => {
      if (!response.ok) throw new Error("No se pudieron cargar los datos de la demo.");
      return response.json();
    });
    cache.set(file, pending);
  }
  return pending as Promise<T>;
}

export const loadStats = () => load<Stats>("stats");
export const loadCategories = () => load<{ data: Category[] }>("categories");
export const loadResource = (resource: ResourceName) => load<Page<Entity>>(resource);

export const ALL_RESOURCES: ResourceName[] = [
  "places",
  "security-incidents",
  "road-segments",
  "cadastral-properties",
  "localities",
];
