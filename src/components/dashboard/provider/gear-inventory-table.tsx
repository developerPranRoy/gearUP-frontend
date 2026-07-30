import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DeleteGearButton } from "@/components/dashboard/provider/delete-gear-button";
import { ToggleAvailabilityButton } from "@/components/dashboard/provider/toggle-availability-button";
import type { GearItem } from "@/types/api";

export function GearInventoryTable({ gear }: { gear: GearItem[] }) {
  if (gear.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        You haven&apos;t listed any gear yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-2 font-medium">Name</th>
            <th className="pb-2 font-medium">Category</th>
            <th className="pb-2 font-medium">Price/day</th>
            <th className="pb-2 font-medium">Stock</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {gear.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-0">
              <td className="py-3 font-medium text-foreground">{item.name}</td>
              <td className="py-3 text-muted-foreground">{item.category.name}</td>
              <td className="py-3 font-mono">৳{item.pricePerDay.toLocaleString()}</td>
              <td className="py-3 font-mono text-muted-foreground">
                {item.availableStock}/{item.totalStock}
              </td>
              <td className="py-3">
                <StatusBadge status={item.status} />
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1.5">
                  <Button size="icon" variant="ghost" asChild aria-label="Edit">
                    <Link href={`/dashboard/provider/gear/${item.id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <ToggleAvailabilityButton gearId={item.id} status={item.status} />
                  <DeleteGearButton gearId={item.id} gearName={item.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
