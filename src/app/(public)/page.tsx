import Link from "next/link";
import { ArrowRight, Zap, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GearCard } from "@/components/gear/gear-card";
import { apiFetchPaginated } from "@/lib/api-client";
import type { GearItem } from "@/types/api";

const FEATURES = [
  { icon: Zap, title: "Book instantly", desc: "Pick dates, confirm, done. No phone calls." },
  { icon: MapPin, title: "Pick up locally", desc: "Gear from providers near you." },
  { icon: Shield, title: "Verified listings", desc: "Every provider is reviewed and trusted." },
];

export default async function HomePage() {
  const { data: featuredGear } = await apiFetchPaginated<GearItem[]>(
    "/gear?limit=8&sortBy=createdAt&sortOrder=desc&status=AVAILABLE"
  ).catch(() => ({ data: [] as GearItem[], meta: undefined }));

  return (
    <div className="overflow-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-trail/10 blur-3xl" />
          <div className="absolute right-1/4 top-24 h-48 w-48 rounded-full bg-blaze/8 blur-3xl" />
        </div>

        <p className="animate-fade-up mb-4 inline-block rounded-full border border-trail/20 bg-trail/5 px-4 py-1 font-mono text-xs uppercase tracking-widest text-trail">
          Sports &amp; outdoor gear, on demand
        </p>

        <h1 className="animate-fade-up animate-delay-100 font-display text-5xl font-semibold leading-[1.1] text-pine sm:text-6xl">
          Rent the gear.
          <br />
          <span className="text-trail">Skip the ownership.</span>
        </h1>

        <p className="animate-fade-up animate-delay-200 mx-auto mt-6 max-w-lg text-base text-slate">
          Bikes, tents, kayaks, and fitness equipment from local providers —
          book by the day, pick up nearby, return when you&apos;re done.
        </p>

        <div className="animate-fade-up animate-delay-300 mt-8 flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/gear">
              Browse all gear <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/register?role=PROVIDER">List your gear</Link>
          </Button>
        </div>
      </section>

      {/* ── Feature pills ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card animate-fade-up rounded-xl p-5 text-center">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-trail/10">
                <Icon className="size-5 text-trail" />
              </div>
              <p className="font-semibold text-pine">{title}</p>
              <p className="mt-1 text-xs text-slate">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured gear ─────────────────────────────────────────────── */}
      {featuredGear.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-pine">
                Recently listed
              </h2>
              <p className="mt-1 text-sm text-slate">Fresh gear from local providers</p>
            </div>
            <Link
              href="/gear"
              className="flex items-center gap-1 text-sm font-medium text-trail hover:underline"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGear.map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
