import { PackageOpen } from "lucide-react";

import { apiFetch } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard } from "@/components/dashboard/customer/order-card";
import { PaymentHistory } from "@/components/dashboard/customer/payment-history";
import type { RentalOrder, Payment } from "@/types/api";

export default async function CustomerDashboardPage() {
  const token = await getAccessToken();

  const [orders, payments] = await Promise.all([
    apiFetch<RentalOrder[]>("/rentals", { token }),
    apiFetch<Payment[]>("/payments", { token }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-pine">
          Your rentals
        </h1>
        <p className="text-sm text-muted-foreground">
          Track orders, pay for confirmed rentals, and review returned gear.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <PackageOpen className="size-10 text-slate-soft" />
            <p className="font-medium text-pine">No rentals yet</p>
            <p className="text-sm text-muted-foreground">
              Browse gear and place your first order.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment history</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentHistory payments={payments} />
        </CardContent>
      </Card>
    </div>
  );
}
