import type { ReactNode } from "react";

function inline(text: string, keyPrefix: string): ReactNode[] {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? <strong key={`${keyPrefix}-${index}`}>{part}</strong> : <span key={`${keyPrefix}-${index}`}>{part}</span>,
  );
}

/** Renderiza negritas markdown y saltos de linea del agente sin dependencias. */
export function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, index) =>
        line.trim() === "" ? (
          <div key={index} className="h-1" />
        ) : (
          <p key={index} className={line.startsWith("•") ? "pl-1" : ""}>
            {inline(line, String(index))}
          </p>
        ),
      )}
    </div>
  );
}
