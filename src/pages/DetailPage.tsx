import { ArrowLeft, Database, MapPin } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EntityFields } from "../components/detail/EntityFields";
import { EntityHeader } from "../components/detail/EntityHeader";
import { MapView } from "../components/MapView";
import { ErrorState, Loading } from "../components/States";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import { colorFor, nameFor } from "../lib/categories";
import { entityToHit } from "../lib/entities";
import { RESOURCE_LABELS } from "../lib/format";
import type { ResourceName } from "../lib/types";

const VALID_RESOURCES: ResourceName[] = [
  "places",
  "security-incidents",
  "road-segments",
  "cadastral-properties",
  "localities",
];

export function DetailPage() {
  const { resource = "", id = "" } = useParams();
  const navigate = useNavigate();
  const isValid = VALID_RESOURCES.includes(resource as ResourceName);

  const entityQuery = useApi(async () => {
    if (!isValid) throw new Error("Recurso no valido");
    const res = await api.get(resource as ResourceName, id);
    return res.data;
  }, [resource, id]);

  if (!isValid) {
    return <ErrorState message="Recurso o identificador no valido" />;
  }

  const entity = entityQuery.data;
  const hit = entity ? entityToHit(resource as ResourceName, entity) : null;
  const categorySlug = hit?.categorySlug ?? "comida";
  const color = colorFor(categorySlug);
  const resourceLabel = RESOURCE_LABELS[resource] ?? resource;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      {entityQuery.loading && <Loading label="Cargando registro..." />}
      {entityQuery.error && <ErrorState message={entityQuery.error} onRetry={entityQuery.reload} />}

      {!entityQuery.loading && !entityQuery.error && entity && hit && (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="glass space-y-6 p-6 sm:p-8">
            <EntityHeader
              color={color}
              resourceLabel={resourceLabel}
              categoryName={nameFor(categorySlug)}
              title={hit.title}
              subtitle={hit.subtitle}
              categorySlug={categorySlug}
            />

            <EntityFields entity={entity} />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-neon-cyan" /> Coordenadas: {hit.lat.toFixed(5)},{" "}
                {hit.lon.toFixed(5)}
              </p>
              <Link to={`/admin?resource=${resource}&edit=${id}`} className="btn-ghost text-xs">
                <Database className="h-3.5 w-3.5" /> Editar registro
              </Link>
            </div>
          </div>

          <div>
            <MapView hits={[hit]} height="h-[480px]" zoom={17} />
            <p className="mt-2 text-center text-xs text-slate-500">
              Ubicación exacta en La Floresta Sur (Kennedy, Bogotá)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
