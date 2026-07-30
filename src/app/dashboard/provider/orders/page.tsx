import { apiFetch } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";
import { OrdersTable } from "@/components/dashboard/provider/orders-table";
import type { RentalOrder } from "@/types/api";

export default async function ProviderOrdersPage() {
  const token = await getAccessToken();
  const orders = await apiFetch<RentalOrder[]>("/provider/orders", { token });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-pine">
          Incoming orders
        </h1>
        <p className="text-sm text-muted-foreground">
          Confirm, mark picked up, and mark returned as orders move through.
        </p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
