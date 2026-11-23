import { localAsk } from "./localAsk";
import { ApiError } from "./httpError";
import { loadCategories, loadStats } from "./localData";
import { localGet, localList } from "./localReads";
import { localSearch } from "./localSearch";
import { qs } from "./queryString";
import type {
  Category,
  Entity,
  Page,
  ResourceName,
  Stats,
} from "./types";

export { ApiError };

export const API_BASE = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1"
).replace(/\/$/, "");

/** En el sitio publico se usa la instantanea incluida: sin servidor ni claves. */
export const STATIC_MODE = import.meta.env.VITE_STATIC_DEMO === "true";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
      signal: controller.signal,
    });
    if (response.status === 204) return undefined as T;
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      const message = payload?.error?.message ?? `Error ${response.status}`;
      throw new ApiError(response.status, message);
    }
    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if ((error as Error).name === "AbortError") {
      throw new ApiError(408, "La consulta tardo demasiado. Intenta de nuevo.");
    }
    throw new ApiError(0, "No se pudo conectar con el servidor.");
  } finally {
    clearTimeout(timer);
  }
}

function read<T>(path: string, local: () => Promise<T>, init?: RequestInit): Promise<T> {
  return STATIC_MODE ? local() : request<T>(path, init);
}

function write<T>(path: string, init: RequestInit): Promise<T> {
  if (STATIC_MODE) {
    return Promise.reject(new ApiError(501, "Modo publico de solo lectura."));
  }
  return request<T>(path, init);
}

export const api = {
  stats: () => read<Stats>("/stats", loadStats),
  categories: () => read<{ data: Category[] }>("/categories", loadCategories),
  search: (q: string, limit = 12) =>
    read(`/search${qs({ q, limit })}`, () => localSearch(q, limit)),
  ask: (question: string) =>
    read("/agent/ask", () => localAsk(question), {
      method: "POST",
      body: JSON.stringify({ question }),
    }),
  list: (resource: ResourceName, params: Record<string, string | number | undefined> = {}) =>
    read<Page<Entity>>(`/${resource}${qs(params)}`, () => localList(resource, params)),
  get: (resource: ResourceName, id: string) =>
    read<{ data: Entity }>(`/${resource}/${encodeURIComponent(id)}`, () => localGet(resource, id)),
  create: (resource: ResourceName, body: Entity, adminKey: string) =>
    write<{ data: Entity }>(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "x-admin-key": adminKey },
    }),
  update: (resource: ResourceName, id: string, body: Entity, adminKey: string) =>
    write<{ data: Entity }>(`/${resource}/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "x-admin-key": adminKey },
    }),
  remove: (resource: ResourceName, id: string, adminKey: string) =>
    write<void>(`/${resource}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    }),
};
