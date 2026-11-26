
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  History,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Agentes",
    href: "/#agents",
    icon: Bot,
  },
  {
    name: "Histórico",
    href: "/history",
    icon: History,
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#252b3d] bg-[#0d101a] px-5 py-6">
      <Link href="/" className="mb-12 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
          <Sparkles size={23} className="text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            AI Agent Hub
          </h1>
          <p className="text-xs text-[#929bb2]">
            Intelligent workspace
          </p>
        </div>
      </Link>

      <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-[#68728a]">
        Workspace
      </div>

      <nav className="flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/#agents"
                ? pathname === "/"
                : pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "border border-violet-500/20 bg-violet-500/10 font-medium text-violet-300"
                  : "text-[#929bb2] hover:bg-[#191f30] hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.name}

              {active && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20">
          <MessageSquare size={18} className="text-violet-300" />
        </div>

        <h3 className="text-sm font-semibold text-white">
          AI Workspace
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-[#929bb2]">
          Sua central de agentes inteligentes.
        </p>
      </div>

      <div className="mt-5 border-t border-[#252b3d] pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
            AI
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Workspace
            </p>
            <p className="text-xs text-[#929bb2]">
              Personal account
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
