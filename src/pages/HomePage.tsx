import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryGrid } from "../components/CategoryCard";
import { HomeHero } from "../components/home/HomeHero";
import { HomeMapSection } from "../components/home/HomeMapSection";
import { HomeSteps } from "../components/home/HomeSteps";
import { ErrorState } from "../components/States";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import { FALLBACK_CATEGORIES } from "../lib/fallback";
import { entityToHit } from "../lib/entities";

export function HomePage() {
  const stats = useApi(() => api.stats(), []);
  const places = useApi(() => api.list("places", { limit: 100 }), []);

  const categories = stats.data?.categories?.length ? stats.data.categories : FALLBACK_CATEGORIES;
  const hits = (places.data?.data ?? []).map((entity) => entityToHit("places", entity));

  return (
    <div className="space-y-14">
      <HomeHero totalRecords={stats.data?.totalRecords ?? 0} totalCategories={categories.length} />

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="section-title">Explora las 13 categorías</h2>
            <p className="mt-1 text-sm text-slate-400">
              Cada tarjeta abre el listado con su mapa y su CRUD en{" "}
              <Link className="text-neon-cyan" to="/admin">Administrar</Link>.
            </p>
          </div>
          <Link to="/explorar" className="btn-ghost">
            Buscar todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {stats.error ? (
          <ErrorState message={stats.error} onRetry={stats.reload} />
        ) : (
          <CategoryGrid categories={categories} />
        )}
      </section>

      <HomeMapSection
        hits={hits}
        loading={places.loading}
        error={places.error}
        onRetry={places.reload}
      />

      <HomeSteps />
    </div>
  );
}
