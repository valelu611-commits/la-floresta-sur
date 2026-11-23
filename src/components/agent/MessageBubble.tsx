import type { Message } from "../../lib/agentCopy";
import { RichText } from "../RichText";

export function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="ml-8 rounded-2xl rounded-br-sm bg-gradient-to-r from-neon-pink/80 to-neon-violet/80 px-3 py-2 text-sm text-white">
        {message.content}
      </div>
    );
  }

  return (
    <div className="mr-4 rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
      <RichText text={message.content} />
    </div>
  );
}
