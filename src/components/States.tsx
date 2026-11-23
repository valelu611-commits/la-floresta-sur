import { Loader2, SearchX } from "lucide-react";

export function Loading({ label = "Cargando datos del barrio..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-panel/60 p-6 text-sm text-slate-400">
      <Loader2 className="h-5 w-5 animate-spin text-neon-cyan" aria-hidden />
      {label}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="glass flex flex-col items-center gap-3 p-10 text-center">
      <SearchX className="h-8 w-8 text-neon-pink" aria-hidden />
      <p className="font-display text-lg font-bold text-white">{title}</p>
      {hint && <p className="max-w-md text-sm text-slate-400">{hint}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-neon-red/40 bg-neon-red/10 p-5 text-sm text-red-200">
      <p className="font-semibold text-white">Ups, algo salio mal</p>
      <p className="mt-1">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-ghost mt-3">
          Reintentar
        </button>
      )}
    </div>
  );
}
