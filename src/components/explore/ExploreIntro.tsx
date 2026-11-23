import { Filter } from "lucide-react";
import { SearchHero } from "../SearchHero";
import { FALLBACK_CATEGORIES } from "../../lib/fallback";
import { nameFor } from "../../lib/categories";

interface ExploreIntroProps {
  query: string;
  category: string;
}

export function ExploreIntro({ query, category }: ExploreIntroProps) {
  return (
    <section className="glass p-5 sm:p-7">
      <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
        {query ? (
          <>Resultados para <span className="gradient-text">“{query}”</span></>
        ) : category ? (
          <span className="gradient-text">{nameFor(category)}</span>
        ) : (
          "Buscar en el barrio"
        )}
      </h1>
      <p className="mt-1 text-sm text-slate-400">
        Búsqueda transversal sobre lugares, incidentes, vías, predios y fichas de localidad.
      </p>
      <div className="mt-5">
        <SearchHero initial={query} compact />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-slate-500">
          <Filter className="h-3.5 w-3.5" /> Filtros rápidos
        </span>
        {FALLBACK_CATEGORIES.map((item) => (
          <a
            key={item.slug}
            href={`/categoria/${item.slug}`}
            className="chip border-white/10 bg-white/5 text-slate-300 hover:border-neon-pink hover:text-white"
          >
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
}
