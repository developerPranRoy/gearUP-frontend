import Link from "next/link";
import { Bike, Tent, Waves, Dumbbell, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetchPaginated } from "@/lib/api-client";
import type { GearItem } from "@/types/api";


const CATEGORY_ICONS: Record<string, typeof Bike> = {
  Cycling: Bike,
  Camping: Tent,
  "Water Sports": Waves,
  Fitness: Dumbbell,
};

const TAG_STYLES = [
  { rotate: "-rotate-6", offset: "" },
  { rotate: "rotate-3", offset: "mt-10" },
  { rotate: "-rotate-2", offset: "mt-4" },
];

export default async function HomePage() {
  const { data: featuredGear } = await apiFetchPaginated<GearItem[]>(
    "/gear?limit=3&sortBy=createdAt&sortOrder=desc&status=AVAILABLE"
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-trail">
            Sports &amp; outdoor gear, on demand
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.1] text-pine">
            Rent the gear.
            <br />
            Skip the ownership.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Bikes, tents, kayaks, and fitness equipment from local providers —
            book by the day, pick up nearby, return when you&apos;re done.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button asChild size="lg">
              <Link href="/gear">
                Browse gear <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/register?role=PROVIDER">List your gear</Link>
            </Button>
          </div>
        </div>

        {featuredGear.length > 0 && (
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
            {featuredGear.map((gear, i) => {
              const Icon = CATEGORY_ICONS[gear.category.name] ?? Package;
              const style = TAG_STYLES[i % TAG_STYLES.length];
              return (
                <Link
                  key={gear.id}
                  href={`/gear/${gear.id}`}
                  className={`${style.rotate} ${style.offset} flex w-36 flex-col gap-3 rounded-md border border-border bg-canvas p-4 shadow-sm transition-transform hover:rotate-0`}
                  style={{
                    maskImage:
                      "radial-gradient(circle 4px at 14px 14px, transparent 4px, black 4.5px)",
                    WebkitMaskImage:
                      "radial-gradient(circle 4px at 14px 14px, transparent 4px, black 4.5px)",
                  }}
                >
                  <Icon className="size-6 text-trail" />
                  <div>
                    <p className="line-clamp-1 text-sm font-medium text-pine">
                      {gear.name}
                    </p>
                    <p className="font-mono text-xs text-slate-soft">
                      ৳{gear.pricePerDay.toLocaleString()}/day
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}