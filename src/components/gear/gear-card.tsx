import Image from "next/image";
import Link from "next/link";
import { Package, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GearItem } from "@/types/api";

export function GearCard({ gear }: { gear: GearItem }) {
  const image = gear.images?.[0];
  const avgRating = gear.reviews?.length
    ? (gear.reviews.reduce((s, r) => s + r.rating, 0) / gear.reviews.length).toFixed(1)
    : null;
  const isLow = gear.availableStock > 0 && gear.availableStock <= 3;
  const isAvailable = gear.availableStock > 0;

  return (
    <Link href={`/gear/${gear.id}`} className="group block animate-fade-up focus-visible:outline-none">
      <Card className="overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={gear.name}
              fill
              sizes="(min-width:1024px) 25vw,(min-width:640px) 33vw,100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <Package className="size-12 text-muted-foreground/30" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          <Badge
            className="absolute left-3 top-3 border-0 text-[10px] uppercase tracking-wide"
            style={{ background: "rgba(22,163,74,0.90)", color: "#fff" }}
          >
            {gear.category.name}
          </Badge>

          {isLow && (
            <Badge variant="destructive" className="absolute right-3 top-3 text-[10px]">
              Only {gear.availableStock} left!
            </Badge>
          )}

          <p className="absolute bottom-3 left-3 font-mono text-base font-bold text-white drop-shadow">
            ৳{gear.pricePerDay.toLocaleString()}
            <span className="text-xs font-normal text-white/65">/day</span>
          </p>

          {avgRating && (
            <div
              className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              <Star className="size-3" style={{ fill: "var(--amber)", color: "var(--amber)" }} />
              {avgRating}
            </div>
          )}
        </div>

        <CardContent className="p-4 pt-3">
          <h3 className="line-clamp-1 font-display text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {gear.name}
          </h3>

          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-muted-foreground truncate">
              {gear.brand ?? gear.provider.name}
            </p>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={isAvailable
                ? { background: "rgba(22,163,74,0.10)", color: "var(--green)" }
                : { background: "rgba(100,100,100,0.10)", color: "var(--fg-muted)" }
              }
            >
              {isAvailable ? `${gear.availableStock} avail.` : "Unavailable"}
            </span>
          </div>

          <Button
            asChild
            size="sm"
            className="mt-3 w-full gap-1.5 rounded-xl font-semibold"
            style={isAvailable
              ? { background: "var(--green)", color: "#fff" }
              : { background: "var(--muted)", color: "var(--muted-foreground)", pointerEvents: "none", opacity: 0.5 }
            }
          >
            <span>
              {isAvailable ? "Rent Now" : "Unavailable"}
              {isAvailable && <ArrowRight className="size-3.5" />}
            </span>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
