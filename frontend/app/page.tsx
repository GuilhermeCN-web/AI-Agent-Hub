
import {
  Bot,
  MessageSquare,
  Activity,
  Zap,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import AgentCard from "@/components/dashboard/AgentCard";
import { agents } from "@/lib/agents";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#21183b] via-[#15172a] to-[#101522] p-8 md:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-300">
            <Zap size={13} />
            Your AI workspace
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Bem-vindo ao{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              AI Agent Hub
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#a6aec3] md:text-base">
            Sua central de inteligência artificial. Explore agentes,
            inicie conversas e organize suas interações em um só lugar.
          </p>

          <a
            href="#agents"
            className="mt-7 inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Explorar agentes
          </a>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Visão geral
          </h2>
          <p className="mt-1 text-sm text-[#929bb2]">
            Indicadores da plataforma.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Agentes cadastrados"
            value={String(agents.length)}
            description="Agentes configurados no frontend"
            icon={Bot}
          />

          <StatsCard
            title="Agentes disponíveis"
            value={String(agents.filter((agent) => agent.available).length)}
            description="Prontos para utilização"
            icon={Activity}
          />

          <StatsCard
            title="Conversas"
            value="0"
            description="Histórico ainda não integrado"
            icon={MessageSquare}
          />

          <StatsCard
            title="Integração"
            value="API"
            description="Backend FastAPI configurado"
            icon={Zap}
          />
        </div>
      </section>

      <section id="agents">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Seus agentes
          </h2>
          <p className="mt-1 text-sm text-[#929bb2]">
            Selecione um agente para iniciar uma conversa.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}
