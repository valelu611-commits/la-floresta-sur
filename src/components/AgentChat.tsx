import { Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AGENT_GREETING, AGENT_SUGGESTIONS, type Message } from "../lib/agentCopy";
import { api } from "../lib/api";
import { AgentHeader } from "./agent/AgentHeader";
import { MessageBubble } from "./agent/MessageBubble";

export function AgentChat({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: AGENT_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(question: string) {
    const text = question.trim();
    if (text.length < 3 || loading) return;
    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const answer = await api.ask(text);
      setMessages((current) => [...current, { role: "agent", content: answer.answer }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: "agent", content: `No pude responder: ${(error as Error).message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AgentHeader onClose={onClose} />

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {loading && (
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-neon-amber" /> revisando los
            datos del barrio...
          </p>
        )}
        <div ref={bottom} />
      </div>

      <div className="border-t border-white/10 px-3 pb-3 pt-2">
        <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
          {AGENT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void send(suggestion)}
              className="chip shrink-0 border-white/10 bg-white/5 text-slate-300 hover:border-neon-cyan hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribe tu pregunta..."
            aria-label="Pregunta al agente"
            className="field"
          />
          <button type="submit" className="btn-primary h-10 w-10 shrink-0 !p-0" aria-label="Enviar">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
