import { StatusBadge } from "@/components/ui/status-badge";
import type { GearItem } from "@/types/api";

export function AdminGearTable({ gear }: { gear: GearItem[] }) {
  if (gear.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No gear listed on the platform yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-2 font-medium">Name</th>
            <th className="pb-2 font-medium">Provider</th>
            <th className="pb-2 font-medium">Category</th>
            <th className="pb-2 font-medium">Price/day</th>
            <th className="pb-2 font-medium">Stock</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {gear.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-0">
              <td className="py-3 font-medium text-foreground">{item.name}</td>
              <td className="py-3 text-muted-foreground">{item.provider.name}</td>
              <td className="py-3 text-muted-foreground">{item.category.name}</td>
              <td className="py-3 font-mono">৳{item.pricePerDay.toLocaleString()}</td>
              <td className="py-3 font-mono text-muted-foreground">
                {item.availableStock}/{item.totalStock}
              </td>
              <td className="py-3">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
