import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { GearItem } from "@/types/api";

export function GearCard({ gear }: { gear: GearItem }) {
  const image = gear.images?.[0];

  return (
    <Link href={`/gear/${gear.id}`}>
      <Card className="group overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] w-full bg-stone">
          {image ? (
            <Image
              src={image}
              alt={gear.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="size-10 text-slate-soft" />
            </div>
          )}
          <div className="absolute right-2 top-2">
            <StatusBadge status={gear.status} />
          </div>
        </div>
        <div className="space-y-2 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wide text-trail">
            {gear.category.name}
          </p>
          <h3 className="line-clamp-1 font-display text-base font-semibold text-pine">
            {gear.name}
          </h3>
          {gear.brand && (
            <p className="text-xs text-muted-foreground">{gear.brand}</p>
          )}
          <p className="font-mono text-sm font-medium text-pine">
            ৳{gear.pricePerDay.toLocaleString()}
            <span className="text-xs font-normal text-muted-foreground">/day</span>
          </p>
        </div>
      </Card>
    </Link>
  );
}
