import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GearCard } from "@/components/gear/gear-card";
import { apiFetchPaginated } from "@/lib/api-client";
import type { GearItem } from "@/types/api";

export default async function HomePage() {
  const { data: featuredGear } = await apiFetchPaginated<GearItem[]>(
    "/gear?limit=8&sortBy=createdAt&sortOrder=desc&status=AVAILABLE"
  );

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-trail">
          Sports &amp; outdoor gear, on demand
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-pine sm:text-5xl">
          Rent the gear. Skip the ownership.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          Bikes, tents, kayaks, and fitness equipment from local providers —
          book by the day, pick up nearby, return when you&apos;re done.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/gear">
            Browse all gear <ArrowRight />
          </Link>
        </Button>
      </div>

      {featuredGear.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="mb-6 font-display text-2xl font-semibold text-pine">
            Recently listed
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGear.map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}