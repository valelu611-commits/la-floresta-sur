import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchHero } from "../SearchHero";
import { formatNumber } from "../../lib/format";

interface HomeHeroProps {
  totalRecords: number;
  totalCategories: number;
}

export function HomeHero({ totalRecords, totalCategories }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/50 px-5 py-10 sm:px-10 sm:py-14">
      <div className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-neon-pink/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-neon-cyan/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="chip mx-auto border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
          <Sparkles className="h-3.5 w-3.5" /> Kennedy · UPZ 79 Caldas · Bogotá
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
          Todo <span className="gradient-text">La Floresta Sur</span> en un solo lugar
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          Busca, explora el mapa y pregunta en lenguaje natural por seguridad, calles, catastro,
          veterinarias, CAI, cámaras, comida, parques, transporte, deporte y colegios.
        </p>

        <div className="mt-7">
          <SearchHero />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
          <div className="rounded-2xl border border-white/10 bg-ink/50 p-3">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">{formatNumber(totalRecords)}</p>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Registros</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink/50 p-3">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">{totalCategories}</p>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Categorías</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink/50 p-3">
            <p className="flex items-center justify-center gap-1 font-display text-xl font-bold text-white sm:text-2xl">
              <Sparkles className="h-4 w-4 text-neon-pink" /> IA
            </p>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Agente 24/7</p>
          </div>
        </div>

        <Link to="/mapa" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan hover:text-white">
          Abrir el mapa interactivo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
