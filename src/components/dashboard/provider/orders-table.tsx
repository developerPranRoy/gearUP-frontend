import { format } from "date-fns";

import { StatusBadge } from "@/components/ui/status-badge";
import { UpdateOrderStatusButton } from "@/components/dashboard/provider/update-order-status-button";
import type { RentalOrder } from "@/types/api";

export function OrdersTable({ orders }: { orders: RentalOrder[] }) {
  if (orders.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4"
        >
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              #{order.id.slice(0, 8)} · {order.customer?.name ?? "Customer"}
            </p>
            <p className="mt-1 text-sm text-foreground">
              {order.items.map((i) => i.gearItem?.name ?? "Gear").join(", ")}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(order.startDate), "MMM d")} –{" "}
              {format(new Date(order.endDate), "MMM d, yyyy")} · ৳
              {order.totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <UpdateOrderStatusButton orderId={order.id} status={order.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
