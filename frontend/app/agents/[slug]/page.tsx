
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Bot, Lock } from "lucide-react";

import { agents } from "@/lib/agents";
import ChatWindow from "@/components/chat/ChatWindow";

export default function AgentPage() {
  const params = useParams<{ slug: string }>();

  const agent = agents.find((item) => item.slug === params.slug);

  if (!agent) {
    return (
      <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-10 text-center">
        <Bot size={35} className="mx-auto text-violet-400" />
        <h2 className="mt-4 text-xl font-semibold text-white">
          Agente não encontrado
        </h2>
        <Link href="/" className="mt-5 inline-block text-sm text-violet-400">
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  if (!agent.available) {
    return (
      <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-10 text-center">
        <Lock size={35} className="mx-auto text-violet-400" />
        <h2 className="mt-4 text-xl font-semibold text-white">
          Agente em desenvolvimento
        </h2>
        <p className="mt-2 text-sm text-[#929bb2]">
          Este agente ainda não está conectado ao backend.
        </p>
        <Link href="/" className="mt-5 inline-block text-sm text-violet-400">
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  const Icon = agent.icon;

  return (
    <div className="space-y-5">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#929bb2] transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Voltar ao Dashboard
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
          <Icon size={24} className="text-violet-400" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            {agent.name}
          </h1>
          <p className="text-sm text-[#929bb2]">
            {agent.description}
          </p>
        </div>
      </div>

      <ChatWindow agentName={agent.name} />
    </div>
  );
}
