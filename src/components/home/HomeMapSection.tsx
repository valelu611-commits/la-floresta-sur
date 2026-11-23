import { Database, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import type { SearchHit } from "../../lib/types";
import { ErrorState, Loading } from "../States";
import { MapView } from "../MapView";

interface HomeMapSectionProps {
  hits: SearchHit[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function HomeMapSection({ hits, loading, error, onRetry }: HomeMapSectionProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
      <div>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="section-title">Mapa del barrio</h2>
          <Link to="/mapa" className="text-sm font-semibold text-neon-cyan hover:text-white">
            Pantalla completa
          </Link>
        </div>
        {loading && <Loading label="Cargando puntos del mapa..." />}
        {error && <ErrorState message={error} onRetry={onRetry} />}
        {!loading && !error && <MapView hits={hits} height="h-[380px]" showBarrio />}
      </div>

      <div className="glass flex flex-col justify-between p-5">
        <div>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-neon-lime/15 text-neon-lime">
            <MapPinned className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-white">Datos con contexto</h3>
          <p className="mt-2 text-sm text-slate-400">
            Cada punto incluye dirección, horario, fuente y categoría. Filtra por texto, tema o
            caja geográfica desde la API.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>· Seguridad: hurtos, CAI y cámaras</li>
            <li>· Malla vial y datos catastrales</li>
            <li>· Comida, veterinarias y librerías</li>
            <li>· Parques, deporte, colegios y transporte</li>
          </ul>
        </div>
        <Link to="/admin" className="btn-primary mt-6">
          <Database className="h-4 w-4" /> Gestionar datos
        </Link>
      </div>
    </section>
  );
}
