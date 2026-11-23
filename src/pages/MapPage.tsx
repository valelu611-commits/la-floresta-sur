import { Filter } from "lucide-react";
import { useState } from "react";
import { MapView } from "../components/MapView";
import { ErrorState, Loading } from "../components/States";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import { entityToHit } from "../lib/entities";
import type { ResourceName } from "../lib/types";

const LAYER_CONFIGS: Array<{ resource: ResourceName; label: string }> = [
  { resource: "places", label: "Lugares y servicios (13 cat.)" },
  { resource: "security-incidents", label: "Robos y seguridad" },
  { resource: "road-segments", label: "Malla vial" },
  { resource: "cadastral-properties", label: "Predios catastrales" },
  { resource: "localities", label: "Ficha localidad" },
];

export function MapPage() {
  const [activeLayers, setActiveLayers] = useState<Record<ResourceName, boolean>>({
    places: true,
    "security-incidents": true,
    "road-segments": true,
    "cadastral-properties": false,
    localities: false,
  });

  const allHits = useApi(async () => {
    const [places, incidents, roads, cadastral, locality] = await Promise.all([
      api.list("places", { limit: 100 }),
      api.list("security-incidents", { limit: 50 }),
      api.list("road-segments", { limit: 50 }),
      api.list("cadastral-properties", { limit: 50 }),
      api.list("localities", { limit: 10 }),
    ]);

    return [
      ...places.data.map((e) => entityToHit("places", e)),
      ...incidents.data.map((e) => entityToHit("security-incidents", e)),
      ...roads.data.map((e) => entityToHit("road-segments", e)),
      ...cadastral.data.map((e) => entityToHit("cadastral-properties", e)),
      ...locality.data.map((e) => entityToHit("localities", e)),
    ];
  }, []);

  const hits = (allHits.data ?? []).filter((hit) => activeLayers[hit.resource]);

  function toggle(resource: ResourceName) {
    setActiveLayers((curr) => ({ ...curr, [resource]: !curr[resource] }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Mapa interactivo del barrio</h1>
          <p className="mt-1 text-sm text-slate-400">
            Visualiza en tiempo real todos los registros geolocalizados de La Floresta Sur.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {LAYER_CONFIGS.map((layer) => {
            const on = activeLayers[layer.resource];
            return (
              <button
                key={layer.resource}
                type="button"
                onClick={() => toggle(layer.resource)}
                className={`chip transition ${
                  on ? "border-neon-cyan bg-neon-cyan/15 text-white" : "border-white/10 bg-white/5 text-slate-400"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: on ? "#22D3EE" : "#64748B" }} />
                {layer.label}
              </button>
            );
          })}
        </div>
      </div>

      {allHits.loading && <Loading label="Cargando capas geográficas..." />}
      {allHits.error && <ErrorState message={allHits.error} onRetry={allHits.reload} />}

      {!allHits.loading && !allHits.error && (
        <div className="space-y-3">
          <MapView hits={hits} height="h-[72vh]" zoom={16} />
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-400">
            <span>Mostrando <strong className="text-white">{hits.length}</strong> pines en el mapa</span>
            <span className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-neon-cyan" /> Toca cualquier pin para abrir su detalle
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
