import { cn } from "@/lib/utils";
import { STATUS_META, type AnyStatus } from "@/lib/status";

/**
 * Signature element: an equipment/luggage-tag styled badge. The little
 * punched hole on the left is a true alpha mask, so it stays transparent on
 * any background (card, table row, colored surface) instead of faking it
 * with a matched background color.
 */
function StatusBadge({
  status,
  className,
}: {
  status: AnyStatus;
  className?: string;
}) {
  const meta = STATUS_META[status];

  return (
    <span
      data-slot="status-badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm py-1 pl-4 pr-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-white",
        className
      )}
      style={{
        backgroundColor: meta.color,
        maskImage:
          "radial-gradient(circle 2.5px at 8px 50%, transparent 2.5px, black 3px)",
        WebkitMaskImage:
          "radial-gradient(circle 2.5px at 8px 50%, transparent 2.5px, black 3px)",
      }}
    >
      {meta.label}
    </span>
  );
}

export { StatusBadge };
