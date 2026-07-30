import Link from "next/link";
import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CancelOrderButton } from "@/components/dashboard/customer/cancel-order-button";
import { ReviewDialog } from "@/components/dashboard/customer/review-dialog";
import type { RentalOrder } from "@/types/api";

export function OrderCard({ order }: { order: RentalOrder }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            #{order.id.slice(0, 8)}
          </p>
          <p className="mt-1 text-sm text-foreground">
            {format(new Date(order.startDate), "MMM d")} –{" "}
            {format(new Date(order.endDate), "MMM d, yyyy")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-4 space-y-1.5 border-t border-border pt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              {item.gearItem?.name ?? "Gear item"} × {item.quantity}
            </span>
            <span className="font-mono text-muted-foreground">
              ৳{(item.pricePerDay * item.quantity).toLocaleString()}/day
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="font-mono text-sm font-medium text-pine">
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
            order.items.map(
              (item) =>
                item.gearItem && (
                  <ReviewDialog
                    key={item.id}
                    gearItemId={item.gearItemId}
                    gearName={item.gearItem.name}
                  />
                )
            )}
        </div>
      </div>
    </Card>
  );
}
