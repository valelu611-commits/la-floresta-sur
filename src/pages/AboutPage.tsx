import { Database, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export function AboutPage() {
  return (
    <div className="space-y-10">
      <div className="glass p-8 sm:p-10">
        <span className="chip border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
          <Sparkles className="h-3.5 w-3.5" /> Proyecto OpenCode
        </span>
        <h1 className="section-title mt-3">Acerca de La Floresta Sur</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
          Aplicación web pública desarrollada para explorar, consultar y gestionar datos del barrio
          La Floresta Sur (UPZ 79 Caldas, localidad de Kennedy, Bogotá, Colombia).
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-ink/50 p-5">
            <Database className="h-6 w-6 text-neon-pink" />
            <h3 className="mt-3 font-display font-bold text-white">13 Categorías</h3>
            <p className="mt-1 text-xs text-slate-400">
              Robos, malla vial, predios, librerías, CAI, cámaras, comida, veterinarias, localidad,
              zonas verdes, transporte, deporte y educación.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink/50 p-5">
            <Terminal className="h-6 w-6 text-neon-cyan" />
            <h3 className="mt-3 font-display font-bold text-white">Arquitectura 3 Repos</h3>
            <p className="mt-1 text-xs text-slate-400">
              Frontend (React/Vite/Leaflet), API Gateway (Express/Zod) y Backend ORM multi-motor
              (PostgreSQL/PostGIS, SQLite, MySQL).
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink/50 p-5">
            <ShieldCheck className="h-6 w-6 text-neon-lime" />
            <h3 className="mt-3 font-display font-bold text-white">Datos abiertos</h3>
            <p className="mt-1 text-xs text-slate-400">
              Semillas realistas adaptadas al cuadrante con licencia abierta para análisis comunitario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
