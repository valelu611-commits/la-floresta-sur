import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchHeroProps {
  initial?: string;
  compact?: boolean;
}

const IDEAS = ["veterinarias", "CAI", "parques", "transmilenio", "comida", "robos"];

export function SearchHero({ initial = "", compact = false }: SearchHeroProps) {
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const query = value.trim();
    if (query.length === 0) return;
    navigate(`/explorar?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={submit}
        className={`flex items-center gap-2 rounded-2xl border border-white/15 bg-panel/80 p-2 shadow-glow backdrop-blur-xl ${
          compact ? "" : "sm:rounded-full"
        }`}
        role="search"
      >
        <Search className="ml-3 h-5 w-5 shrink-0 text-neon-cyan" aria-hidden />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Busca veterinarias, CAI, parques, comida, transporte..."
          aria-label="Buscar en La Floresta Sur"
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none sm:text-base"
        />
        <button type="submit" className="btn-primary shrink-0 px-4 py-2 text-xs sm:text-sm">
          Buscar
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1 text-neon-amber">
          <Sparkles className="h-3.5 w-3.5" /> Prueba:
        </span>
        {IDEAS.map((idea) => (
          <button
            key={idea}
            type="button"
            onClick={() => navigate(`/explorar?q=${encodeURIComponent(idea)}`)}
            className="chip border-white/10 bg-white/5 text-slate-300 hover:border-neon-pink hover:text-white"
          >
            {idea}
          </button>
        ))}
      </div>
    </div>
  );
}
