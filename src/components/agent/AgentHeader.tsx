import { Bot, X } from "lucide-react";

export function AgentHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-neon-pink to-neon-cyan">
          <Bot className="h-4 w-4 text-white" />
        </span>
        <div>
          <p className="font-display text-sm font-bold text-white">Agente La Floresta</p>
          <p className="text-[10px] uppercase tracking-widest text-neon-lime">
            En linea · datos del barrio
          </p>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar chat"
          className="text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
