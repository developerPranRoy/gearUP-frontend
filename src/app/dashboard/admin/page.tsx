import { Users, Package, CalendarRange } from "lucide-react";

import { apiFetch } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { UsersTable } from "@/components/dashboard/admin/users-table";
import { AdminGearTable } from "@/components/dashboard/admin/gear-table";
import { AdminRentalsTable } from "@/components/dashboard/admin/rentals-table";
import type { User, GearItem, RentalOrder } from "@/types/api";

const TAB_META = {
  users: { title: "Users", description: "All registered accounts on the platform." },
  gear: { title: "Gear Listings", description: "Every gear item listed by every provider." },
  rentals: { title: "Rentals", description: "Every rental order placed on the platform." },
} as const;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const token = await getAccessToken();

  const [users, gear, rentals] = await Promise.all([
    apiFetch<User[]>("/admin/users", { token }),
    apiFetch<GearItem[]>("/admin/gear", { token }),
    apiFetch<RentalOrder[]>("/admin/rentals", { token }),
  ]);

  const activeGear = gear.filter((g) => g.status === "AVAILABLE").length;

  if (tab === "users" || tab === "gear" || tab === "rentals") {
    const meta = TAB_META[tab];
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-pine">{meta.title}</h1>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            {tab === "users" && <UsersTable users={users} />}
            {tab === "gear" && <AdminGearTable gear={gear} />}
            {tab === "rentals" && <AdminRentalsTable rentals={rentals} />}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-pine">
          Platform overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Global health across users, gear, and rentals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Users" value={users.length} icon={Users} />
        <StatCard label="Active Gear" value={activeGear} icon={Package} />
        <StatCard label="Total Rentals" value={rentals.length} icon={CalendarRange} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent users</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable users={users.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
}
