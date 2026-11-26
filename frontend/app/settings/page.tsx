
"use client";

import { useState } from "react";
import { Monitor, Bell, Shield, SlidersHorizontal } from "lucide-react";

function SettingRow({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#252b3d] py-5 last:border-0">
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs text-[#929bb2]">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-violet-600" : "bg-[#343b52]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Configurações
        </h1>
        <p className="mt-2 text-sm text-[#929bb2]">
          Personalize sua experiência no AI Agent Hub.
        </p>
      </div>

      <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-6">
        <div className="mb-2 flex items-center gap-3">
          <Monitor className="text-violet-400" size={21} />
          <h2 className="font-semibold text-white">Aparência</h2>
        </div>

        <SettingRow
          title="Interface escura"
          description="Utilizar o tema escuro da plataforma."
          defaultChecked={true}
        />
      </div>

      <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-6">
        <div className="mb-2 flex items-center gap-3">
          <Bell className="text-violet-400" size={21} />
          <h2 className="font-semibold text-white">Notificações</h2>
        </div>

        <SettingRow
          title="Notificações"
          description="Permitir notificações da plataforma."
        />
      </div>

      <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-6">
        <div className="mb-2 flex items-center gap-3">
          <SlidersHorizontal className="text-violet-400" size={21} />
          <h2 className="font-semibold text-white">Experiência</h2>
        </div>

        <SettingRow
          title="Confirmação antes de enviar"
          description="Solicitar confirmação antes de enviar mensagens."
        />
      </div>

      <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-6">
        <div className="mb-2 flex items-center gap-3">
          <Shield className="text-violet-400" size={21} />
          <h2 className="font-semibold text-white">Privacidade</h2>
        </div>

        <p className="text-sm leading-relaxed text-[#929bb2]">
          As configurações de armazenamento, autenticação e
          gerenciamento de dados serão implementadas nas próximas
          etapas do projeto.
        </p>
      </div>
    </section>
  );
}
