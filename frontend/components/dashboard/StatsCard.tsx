
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-[#252b3d] bg-[#111522] p-5 transition hover:border-violet-500/30">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#929bb2]">
          {title}
        </p>

        <div className="rounded-xl bg-violet-500/10 p-2.5">
          <Icon size={20} className="text-violet-400" />
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-xs text-[#929bb2]">
        {description}
      </p>
    </div>
  );
}
