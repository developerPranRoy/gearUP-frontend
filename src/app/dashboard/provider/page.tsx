import Link from "next/link";
import { Package, Clock, Activity, Plus } from "lucide-react";

import { apiFetch } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { GearInventoryTable } from "@/components/dashboard/provider/gear-inventory-table";
import type { GearItem, RentalOrder } from "@/types/api";

export default async function ProviderDashboardPage() {
  const token = await getAccessToken();

  const [gear, orders] = await Promise.all([
    apiFetch<GearItem[]>("/provider/gear", { token }),
    apiFetch<RentalOrder[]>("/provider/orders", { token }),
  ]);

  const pendingOrders = orders.filter((o) => o.status === "PLACED").length;
  const activeRentals = orders.filter((o) =>
    ["CONFIRMED", "PAID", "PICKED_UP"].includes(o.status)
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-pine">
            Provider overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your inventory and track orders.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/provider/gear/new">
            <Plus /> Add gear
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Gear Listed" value={gear.length} icon={Package} />
        <StatCard label="Active Rentals" value={activeRentals} icon={Activity} />
        <StatCard label="Pending Orders" value={pendingOrders} icon={Clock} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <GearInventoryTable gear={gear} />
        </CardContent>
      </Card>
    </div>
  );
}
