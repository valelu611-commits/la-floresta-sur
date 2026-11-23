import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="glass flex flex-col items-center gap-4 py-20 text-center">
      <Compass className="h-12 w-12 text-neon-pink animate-pulse" />
      <h1 className="font-display text-3xl font-bold text-white">Página no encontrada</h1>
      <p className="max-w-md text-sm text-slate-400">
        La ruta que buscas no existe o fue movida. Vuelve al inicio o explora el mapa de La Floresta Sur.
      </p>
      <Link to="/" className="btn-primary mt-4">
        Volver al inicio
      </Link>
    </div>
  );
}
