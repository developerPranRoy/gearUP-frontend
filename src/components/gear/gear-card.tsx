import Image from "next/image";
import Link from "next/link";
import { Package, Star } from "lucide-react";
import type { GearItem } from "@/types/api";

export function GearCard({ gear }: { gear: GearItem }) {
  const image = gear.images?.[0];
  const avgRating =
    gear.reviews && gear.reviews.length > 0
      ? (gear.reviews.reduce((s, r) => s + r.rating, 0) / gear.reviews.length).toFixed(1)
      : null;

  return (
    <Link href={`/gear/${gear.id}`} className="group block animate-fade-up">
      <div className="glass-card overflow-hidden rounded-xl">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone">
          {image ? (
            <Image
              src={image}
              alt={gear.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-stone/80">
              <Package className="size-10 text-slate-soft" />
            </div>
          )}
          {/* Category pill overlay */}
          <div className="absolute left-3 top-3">
            <span className="glass rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
              style={{ color: "var(--surface-dark-text)" }}>
              {gear.category.name}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="line-clamp-1 font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {gear.name}
          </h3>

          <div className="mt-1 flex items-center justify-between">
            {gear.brand && (
              <p className="text-xs text-muted-foreground">{gear.brand}</p>
            )}
            {avgRating && (
              <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Star className="size-3" style={{ fill: "var(--gold)", color: "var(--gold)" }} />
                {avgRating}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-sm font-semibold text-foreground">
              ৳{gear.pricePerDay.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground">/day</span>
            </p>
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ background: "rgba(30,77,53,0.10)", color: "var(--brand)" }}>
              {gear.availableStock} left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
