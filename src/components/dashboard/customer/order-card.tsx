import Link from "next/link";
import { format } from "date-fns";
import { CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CancelOrderButton } from "@/components/dashboard/customer/cancel-order-button";
import { ReviewDialog } from "@/components/dashboard/customer/review-dialog";
import type { RentalOrder } from "@/types/api";

export function OrderCard({ order }: { order: RentalOrder }) {
  return (
    <div className="glass-card animate-fade-up rounded-xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-trail/10">
            <CalendarRange className="size-4 text-trail" />
          </div>
          <div>
            <p className="font-mono text-xs text-slate">#{order.id.slice(0, 8)}</p>
            <p className="text-sm font-medium text-pine">
              {format(new Date(order.startDate), "MMM d")} –{" "}
              {format(new Date(order.endDate), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-4 space-y-2 rounded-xl bg-white/40 p-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="font-medium text-pine">
              {item.gearItem?.name ?? "Gear item"} × {item.quantity}
            </span>
            <span className="font-mono text-slate">
              ৳{(item.pricePerDay * item.quantity).toLocaleString()}/day
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/40 pt-4">
        <p className="font-mono text-sm font-bold text-pine">
          Total: ৳{order.totalAmount.toLocaleString()}
        </p>
        <div className="flex flex-wrap gap-2">
          {order.status === "PLACED" && <CancelOrderButton orderId={order.id} />}
          {order.status === "CONFIRMED" && (
            <Button asChild size="sm">
              <Link href={`/dashboard/customer/orders/${order.id}/pay`}>Pay Now</Link>
            </Button>
          )}
          {order.status === "RETURNED" &&
            order.items.map((item) =>
              item.gearItem ? (
                <ReviewDialog key={item.id} gearItemId={item.gearItemId} gearName={item.gearItem.name} />
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}
