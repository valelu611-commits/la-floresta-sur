import { Github, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const REPOS = [
  "la-floresta-sur",
  "la-floresta-sur-api",
  "la-floresta-sur-backend",
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-ink/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">La Floresta Sur</p>
          <p className="mt-2 text-sm text-slate-400">
            Barrio de la UPZ 79 Caldas, localidad de Kennedy, Bogotá. Proyecto academico
            de arquitectura por capas con datos de ejemplo.
          </p>
          <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-neon-pink" /> 4.6112, -74.1508
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link className="hover:text-white" to="/categoria/seguridad">Seguridad ciudadana</Link></li>
            <li><Link className="hover:text-white" to="/categoria/veterinarias">Veterinarias</Link></li>
            <li><Link className="hover:text-white" to="/categoria/transporte">Transporte</Link></li>
            <li><Link className="hover:text-white" to="/categoria/zonas-verdes">Zonas verdes</Link></li>
            <li><Link className="hover:text-white" to="/admin">CRUD de datos</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Codigo</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {REPOS.map((repo) => (
              <li key={repo}>
                <a
                  className="inline-flex items-center gap-2 hover:text-white"
                  href={`https://github.com/valelu611-commits/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" /> {repo}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">MIT · 2026</p>
        </div>
      </div>
    </footer>
  );
}
