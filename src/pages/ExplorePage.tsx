import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ExploreIntro } from "../components/explore/ExploreIntro";
import { HitCard } from "../components/HitCard";
import { MapView } from "../components/MapView";
import { EmptyState, ErrorState, Loading } from "../components/States";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import { nameFor, resourceFor } from "../lib/categories";
import { entityToHit } from "../lib/entities";
import type { SearchHit } from "../lib/types";

export function ExplorePage() {
  const [params] = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const category = params.get("cat")?.trim() ?? "";

  const result = useApi<SearchHit[] | null>(async () => {
    if (query) {
      const response = await api.search(query, 30);
      return response.hits;
    }
    if (category) {
      const resource = resourceFor(category);
      const response = await api.list(resource, {
        limit: 60,
        ...(resource === "places" ? { category } : {}),
      });
      return response.data.map((entity) => entityToHit(resource, entity));
    }
    return null;
  }, [query, category]);

  const hits = result.data ?? [];

  return (
    <div className="space-y-6">
      <ExploreIntro query={query} category={category} />

      {!query && !category && (
        <EmptyState
          title="Escribe algo o elige una categoría"
          hint="Por ejemplo: veterinarias, CAI, parques, transmilenio, huecos, estrato."
        />
      )}

      {result.loading && <Loading label="Buscando en los datos del barrio..." />}
      {result.error && <ErrorState message={result.error} onRetry={result.reload} />}

      {!result.loading && !result.error && (query || category) && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-400">
              <span className="font-display text-lg font-bold text-white">{hits.length}</span>{" "}
              resultados
              {query ? ` para “${query}”` : ""}
              {category ? ` en ${nameFor(category)}` : ""}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Search className="h-3.5 w-3.5" /> toca un pin para ver el detalle
            </span>
          </div>

          {hits.length === 0 ? (
            <EmptyState
              title="Sin coincidencias"
              hint="Prueba con otra palabra, revisa la ortografía o explora una categoría."
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-3">
                {hits.map((hit) => (
                  <HitCard key={`${hit.resource}-${hit.id}`} hit={hit} />
                ))}
              </div>
              <div className="lg:sticky lg:top-24 lg:self-start">
                <MapView hits={hits} height="h-[440px]" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
