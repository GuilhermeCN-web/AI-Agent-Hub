
import { Bot, User, AlertCircle } from "lucide-react";

export type MessageRole = "user" | "assistant" | "error";

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
}

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const isError = role === "error";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          isUser
            ? "bg-blue-500/20 text-blue-300"
            : isError
              ? "bg-red-500/10 text-red-400"
              : "bg-violet-500/20 text-violet-300"
        }`}
      >
        {isUser ? (
          <User size={18} />
        ) : isError ? (
          <AlertCircle size={18} />
        ) : (
          <Bot size={18} />
        )}
      </div>

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "rounded-tr-sm bg-violet-600 text-white"
            : isError
              ? "rounded-tl-sm border border-red-500/20 bg-red-500/10 text-red-300"
              : "rounded-tl-sm border border-[#252b3d] bg-[#171c2b] text-[#e5e7eb]"
        }`}
      >
        <p className="mb-1 text-xs font-semibold opacity-70">
          {isUser ? "Você" : isError ? "Erro" : "General Assistant"}
        </p>

        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
