import { afterEach, describe, expect, it, vi } from "vitest";
import { api, ApiError } from "../src/lib/api";

function stubFetch(payload: unknown, ok = true, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(payload),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("api client", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("construye la busqueda con query y limite", async () => {
    const fetchMock = stubFetch({ query: "parques", total: 0, hits: [], countsByCategory: {} });
    await api.search("parques", 5);
    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/search?q=parques&limit=5");
  });

  it("envia la llave de administrador al crear", async () => {
    const fetchMock = stubFetch({ data: { id: "1" } });
    await api.create("places", { name: "Parque" }, "secreta");
    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.headers["x-admin-key"]).toBe("secreta");
  });

  it("omite parametros vacios en los listados", async () => {
    const fetchMock = stubFetch({ data: [], meta: { total: 0, limit: 20, offset: 0 } });
    await api.list("places", { limit: 20, category: undefined, search: "" });
    expect(String(fetchMock.mock.calls[0][0])).toContain("/places?limit=20");
  });

  it("convierte errores HTTP en ApiError con el mensaje de la API", async () => {
    stubFetch({ error: { message: "Llave invalida" } }, false, 401);
    const error = await api.stats().catch((cause) => cause);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(401);
    expect(error.message).toBe("Llave invalida");
  });

  it("reporta fallo de conexion con estado 0", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const error = await api.stats().catch((cause) => cause);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(0);
  });
});
