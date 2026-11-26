
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Agent } from "@/lib/agents";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const Icon = agent.icon;

  const content = (
    <div className="group flex h-full flex-col rounded-2xl border border-[#252b3d] bg-[#111522] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/20">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20">
          <Icon size={23} className="text-violet-300" />
        </div>

        {agent.available ? (
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            Disponível
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full border border-[#3b4255] bg-[#191f30] px-3 py-1 text-xs text-[#929bb2]">
            <Lock size={11} />
            Em breve
          </span>
        )}
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-violet-400">
          {agent.category}
        </p>

        <h3 className="mt-2 text-lg font-semibold text-white">
          {agent.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-relaxed text-[#929bb2]">
          {agent.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[#252b3d] pt-4">
        <span className="text-sm font-medium text-white">
          {agent.available ? "Abrir agente" : "Indisponível"}
        </span>

        <ArrowUpRight
          size={18}
          className="text-[#929bb2] transition group-hover:text-violet-400"
        />
      </div>
    </div>
  );

  if (!agent.available) {
    return <div className="h-full cursor-not-allowed opacity-70">{content}</div>;
  }

  return (
    <Link href={`/agents/${agent.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
