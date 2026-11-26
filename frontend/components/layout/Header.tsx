
"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Sparkles } from "lucide-react";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/history": "Histórico",
  "/settings": "Configurações",
};

export default function Header() {
  const pathname = usePathname();

  const title = titles[pathname] || "Agente";

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#252b3d] px-8">
      <div>
        <p className="text-xs text-[#929bb2]">
          AI Agent Hub / Workspace
        </p>

        <h2 className="mt-1 text-xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-[#252b3d] bg-[#111522] px-4 py-2.5 md:flex">
          <Search size={17} className="text-[#929bb2]" />

          <span className="text-sm text-[#68728a]">
            AI Agent Hub
          </span>
        </div>

        <button
          type="button"
          aria-label="Notificações"
          className="rounded-xl border border-[#252b3d] bg-[#111522] p-2.5 text-[#929bb2] transition hover:text-white"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-[#252b3d] bg-[#111522] px-3 py-2">
          <Sparkles size={16} className="text-violet-400" />
          <span className="hidden text-sm text-white sm:block">
            AI Workspace
          </span>
        </div>
      </div>
    </header>
  );
}
