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
            <span className="glass rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-pine">
              {gear.category.name}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="line-clamp-1 font-display text-base font-semibold text-pine group-hover:text-trail transition-colors">
            {gear.name}
          </h3>

          <div className="mt-1 flex items-center justify-between">
            {gear.brand && (
              <p className="text-xs text-slate-soft">{gear.brand}</p>
            )}
            {avgRating && (
              <div className="flex items-center gap-0.5 text-xs text-slate-soft">
                <Star className="size-3 fill-blaze text-blaze" />
                {avgRating}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-sm font-semibold text-pine">
              ৳{gear.pricePerDay.toLocaleString()}
              <span className="text-xs font-normal text-slate-soft">/day</span>
            </p>
            <span className="rounded-full bg-trail/10 px-2.5 py-0.5 text-xs font-medium text-trail">
              {gear.availableStock} left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
