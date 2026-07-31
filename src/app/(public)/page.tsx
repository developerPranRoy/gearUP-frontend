import Link from "next/link";
import { Bike, Tent, Waves, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURED_TAGS = [
  { icon: Bike, label: "Trail Bike", price: "৳500/day", rotate: "-rotate-6", offset: "" },
  { icon: Tent, label: "4P Tent", price: "৳300/day", rotate: "rotate-3", offset: "mt-10" },
  { icon: Waves, label: "Kayak", price: "৳650/day", rotate: "-rotate-2", offset: "mt-4" },
];

export default function HomePage() {
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
          
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
          {FEATURED_TAGS.map((tag) => {
            const Icon = tag.icon;
            return (
              <div
                key={tag.label}
                className={`${tag.rotate} ${tag.offset} flex w-36 flex-col gap-3 rounded-md border border-border bg-canvas p-4 shadow-sm transition-transform hover:rotate-0`}
                style={{
                  maskImage:
                    "radial-gradient(circle 4px at 14px 14px, transparent 4px, black 4.5px)",
                  WebkitMaskImage:
                    "radial-gradient(circle 4px at 14px 14px, transparent 4px, black 4.5px)",
                }}
              >
                <Icon className="size-6 text-trail" />
                <div>
                  <p className="text-sm font-medium text-pine">{tag.label}</p>
                  <p className="font-mono text-xs text-slate-soft">{tag.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
