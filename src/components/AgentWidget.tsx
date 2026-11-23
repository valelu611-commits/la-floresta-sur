import { Sparkles } from "lucide-react";
import { useState } from "react";
import { AgentChat } from "./AgentChat";

export function AgentWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <section
          aria-label="Agente de IA"
          className="fixed bottom-24 right-4 z-[1200] flex h-[min(70vh,560px)] w-[min(92vw,390px)] flex-col overflow-hidden rounded-3xl border border-white/15 bg-panel/95 shadow-2xl backdrop-blur-2xl"
        >
          <AgentChat onClose={() => setOpen(false)} />
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-[1210] flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan px-4 py-3 font-display text-sm font-bold text-white shadow-glow transition hover:brightness-110"
      >
        <Sparkles className="h-5 w-5 animate-pulseSlow" />
        <span className="hidden sm:inline">{open ? "Cerrar agente" : "Preguntale a la IA"}</span>
        <span className="sm:hidden">{open ? "Cerrar" : "IA"}</span>
      </button>
    </>
  );
}
