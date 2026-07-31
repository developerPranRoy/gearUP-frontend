import { format } from "date-fns";

import { StatusBadge } from "@/components/ui/status-badge";
import type { RentalOrder } from "@/types/api";

export function AdminRentalsTable({ rentals }: { rentals: RentalOrder[] }) {
  if (rentals.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No rental orders on the platform yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-2 font-medium">Order</th>
            <th className="pb-2 font-medium">Customer</th>
            <th className="pb-2 font-medium">Gear</th>
            <th className="pb-2 font-medium">Dates</th>
            <th className="pb-2 font-medium">Total</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((order) => (
            <tr key={order.id} className="border-b border-border last:border-0">
              <td className="py-3 font-mono text-xs text-muted-foreground">
                #{order.id.slice(0, 8)}
              </td>
              <td className="py-3 text-foreground">{order.customer?.name ?? "—"}</td>
              <td className="py-3 text-muted-foreground">
                {order.items.map((i) => i.gearItem?.name ?? "Gear").join(", ")}
              </td>
              <td className="py-3 text-muted-foreground">
                {format(new Date(order.startDate), "MMM d")} –{" "}
                {format(new Date(order.endDate), "MMM d, yyyy")}
              </td>
              <td className="py-3 font-mono">৳{order.totalAmount.toLocaleString()}</td>
              <td className="py-3">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
