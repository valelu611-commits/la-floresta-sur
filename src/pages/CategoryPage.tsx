import { ArrowLeft, Database } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { HitCard } from "../components/HitCard";
import { MapView } from "../components/MapView";
import { EmptyState, ErrorState, Loading } from "../components/States";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import {
  categoryIcon,
  colorFor,
  resourceFor,
} from "../lib/categories";
import { FALLBACK_CATEGORIES } from "../lib/fallback";
import { descriptionFor } from "../lib/categoryDescriptions";
import { entityToHit } from "../lib/entities";

export function CategoryPage() {
  const { slug = "" } = useParams();
  const fallback = FALLBACK_CATEGORIES.find((item) => item.slug === slug);
  const stats = useApi(() => api.stats(), []);
  const category = stats.data?.categories.find((item) => item.slug === slug) ?? fallback;
  const resource = category?.resource ?? resourceFor(slug);

  const data = useApi(async () => {
    const response = await api.list(resource, {
      limit: 100,
      ...(resource === "places" ? { category: slug } : {}),
    });
    return response.data.map((entity) => entityToHit(resource, entity));
  }, [slug, resource]);

  const Icon = categoryIcon(slug);
  const color = category?.color ?? colorFor(slug);
  const hits = data.data ?? [];

  return (
    <div className="space-y-6">
      <Link to="/explorar" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Volver a explorar
      </Link>

      <header
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
        style={{ background: `linear-gradient(135deg, ${color}22, rgba(13,20,38,0.85))` }}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: `${color}44` }} aria-hidden />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${color}22`, color }}>
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400">Categoría · {resource}</p>
              <h1 className="font-display text-3xl font-bold text-white">{category?.name ?? slug}</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-300">
                {category?.description || descriptionFor(slug)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip border-white/10 bg-ink/50 text-white">{hits.length} registros</span>
            <Link to="/admin" className="btn-ghost">
              <Database className="h-4 w-4" /> CRUD
            </Link>
          </div>
        </div>
      </header>

      {data.loading && <Loading />}
      {data.error && <ErrorState message={data.error} onRetry={data.reload} />}

      {!data.loading && !data.error && (
        hits.length === 0 ? (
          <EmptyState
            title="Esta categoría aún no tiene registros"
            hint="Puedes agregar el primero desde la sección Administrar."
          />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-3">
              {hits.map((hit) => (
                <HitCard key={`${hit.resource}-${hit.id}`} hit={hit} />
              ))}
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <MapView hits={hits} height="h-[460px]" />
              <p className="mt-2 text-center text-xs text-slate-500">
                Pines coloreados por categoría · {hits.length} puntos en el barrio
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
