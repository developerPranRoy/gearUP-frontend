import { cn } from "@/lib/utils";
import { STATUS_META, type AnyStatus } from "@/lib/status";

export function StatusBadge({ status, className }: { status: AnyStatus; className?: string }) {
  const meta = STATUS_META[status];

  return (
    <span
      data-slot="status-badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white",
        className
      )}
      style={{ backgroundColor: meta.color }}
    >
      <span
        className="size-1.5 rounded-full bg-white/60"
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}
