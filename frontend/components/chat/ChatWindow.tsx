
"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, Bot, LoaderCircle, Sparkles } from "lucide-react";
import MessageBubble, {
  type MessageRole,
} from "./MessageBubble";
import { sendMessage } from "@/lib/api";

interface Message {
  id: number;
  role: MessageRole;
  content: string;
}

interface ChatWindowProps {
  agentName: string;
}

export default function ChatWindow({ agentName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(message);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível conectar ao agente.";

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "error",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-[calc(100vh-150px)] min-h-[500px] flex-col overflow-hidden rounded-2xl border border-[#252b3d] bg-[#111522]">
      <div className="flex items-center gap-3 border-b border-[#252b3d] p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
          <Bot size={22} className="text-white" />
        </div>

        <div>
          <h2 className="font-semibold text-white">{agentName}</h2>
          <p className="text-xs text-[#929bb2]">
            Assistente de inteligência artificial
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-[#929bb2]">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          Chat
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="m-auto max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
              <Sparkles size={30} className="text-violet-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              Como posso ajudar?
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[#929bb2]">
              Envie uma mensagem para começar uma conversa com o{" "}
              {agentName}.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-sm text-[#929bb2]">
            <LoaderCircle size={18} className="animate-spin text-violet-400" />
            O agente está pensando...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-[#252b3d] p-4"
      >
        <div className="flex items-end gap-3 rounded-xl border border-[#343b52] bg-[#090b12] p-2 transition focus-within:border-violet-500/60">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Digite sua mensagem..."
            rows={1}
            disabled={loading}
            className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-[#68728a] disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar mensagem"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp size={19} />
          </button>
        </div>

        <p className="mt-2 text-center text-xs text-[#68728a]">
          A inteligência artificial pode cometer erros. Verifique informações importantes.
        </p>
      </form>
    </section>
  );
}
