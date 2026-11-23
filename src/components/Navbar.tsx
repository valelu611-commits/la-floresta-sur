import { Compass, Map, Menu, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/mapa", label: "Mapa" },
  { to: "/admin", label: "Administrar" },
  { to: "/acerca", label: "Acerca" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-pink via-neon-violet to-neon-cyan font-display text-sm font-bold text-white">
            LF
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-white">La Floresta Sur</span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400">Kennedy · Bogotá</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm transition ${
                  isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/mapa" className="btn-primary ml-2 px-4 py-2 text-xs">
            <Compass className="h-4 w-4" /> Abrir mapa
          </Link>
        </nav>

        <button
          type="button"
          className="btn-ghost md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-white/10 px-4 py-3 md:hidden" aria-label="Movil">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="flex items-center justify-center gap-2 border-t border-white/5 py-1.5 text-[11px] text-slate-500">
        <ShieldCheck className="h-3 w-3 text-neon-lime" />
        Datos abiertos de demostracion · verifica fuentes oficiales
        <Map className="h-3 w-3 text-neon-cyan" />
      </div>
    </header>
  );
}
