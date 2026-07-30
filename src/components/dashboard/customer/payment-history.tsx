import { format } from "date-fns";

import { StatusBadge } from "@/components/ui/status-badge";
import type { Payment } from "@/types/api";

export function PaymentHistory({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No payments yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-2 font-medium">Transaction</th>
            <th className="pb-2 font-medium">Method</th>
            <th className="pb-2 font-medium">Amount</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b border-border last:border-0">
              <td className="py-3 font-mono text-xs text-muted-foreground">
                {payment.transactionId.slice(0, 16)}…
              </td>
              <td className="py-3">{payment.method}</td>
              <td className="py-3 font-mono">৳{payment.amount.toLocaleString()}</td>
              <td className="py-3">
                <StatusBadge status={payment.status} />
              </td>
              <td className="py-3 text-muted-foreground">
                {format(new Date(payment.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
