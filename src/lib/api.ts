import type {
  AgentAnswer,
  Category,
  Entity,
  Page,
  ResourceName,
  SearchResponse,
  Stats,
} from "./types";

export const API_BASE = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

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

function qs(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const text = search.toString();
  return text ? `?${text}` : "";
}

export const api = {
  stats: () => request<Stats>("/stats"),
  categories: () => request<{ data: Category[] }>("/categories"),
  search: (q: string, limit = 12) =>
    request<SearchResponse>(`/search${qs({ q, limit })}`),
  ask: (question: string) =>
    request<AgentAnswer>("/agent/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    }),
  list: (resource: ResourceName, params: Record<string, string | number | undefined> = {}) =>
    request<Page<Entity>>(`/${resource}${qs(params)}`),
  get: (resource: ResourceName, id: string) =>
    request<{ data: Entity }>(`/${resource}/${encodeURIComponent(id)}`),
  create: (resource: ResourceName, body: Entity, adminKey: string) =>
    request<{ data: Entity }>(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "x-admin-key": adminKey },
    }),
  update: (resource: ResourceName, id: string, body: Entity, adminKey: string) =>
    request<{ data: Entity }>(`/${resource}/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "x-admin-key": adminKey },
    }),
  remove: (resource: ResourceName, id: string, adminKey: string) =>
    request<void>(`/${resource}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    }),
};
