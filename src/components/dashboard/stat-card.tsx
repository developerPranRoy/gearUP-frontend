import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
}) {
  return (
    <div className="glass-card animate-fade-up rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-trail/10">
          <Icon className="size-5 text-trail" />
        </div>
        {trend && (
          <span className="rounded-full bg-trail/10 px-2 py-0.5 text-xs font-medium text-trail">
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 font-mono text-3xl font-bold text-pine">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate">{label}</p>
    </div>
  );
}
