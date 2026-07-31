import Link from "next/link";
import { Plus } from "lucide-react";

import { apiFetch } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GearInventoryTable } from "@/components/dashboard/provider/gear-inventory-table";
import type { GearItem } from "@/types/api";

export default async function ProviderInventoryPage() {
  const token = await getAccessToken();
  const gear = await apiFetch<GearItem[]>("/provider/gear", { token });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-pine">My Gear</h1>
          <p className="text-sm text-muted-foreground">
            {gear.length} {gear.length === 1 ? "item" : "items"} in your inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/provider/gear/new">
            <Plus /> Add gear
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <GearInventoryTable gear={gear} />
        </CardContent>
      </Card>
    </div>
  );
}
