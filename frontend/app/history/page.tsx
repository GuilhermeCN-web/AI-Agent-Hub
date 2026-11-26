
import Link from "next/link";
import { History, MessageSquare, ArrowRight } from "lucide-react";

export default function HistoryPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Histórico de conversas
        </h1>
        <p className="mt-2 text-sm text-[#929bb2]">
          Consulte suas interações anteriores com os agentes.
        </p>
      </div>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#343b52] bg-[#111522]/50 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
          <History size={30} className="text-violet-400" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-white">
          Nenhuma conversa registrada
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#929bb2]">
          Quando implementarmos o armazenamento das conversas,
          elas aparecerão aqui.
        </p>

        <Link
          href="/agents/general-assistant"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
        >
          <MessageSquare size={17} />
          Iniciar conversa
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
