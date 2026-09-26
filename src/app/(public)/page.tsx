import Link from "next/link";
import { ArrowRight, Zap, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GearCard } from "@/components/gear/gear-card";
import { apiFetchPaginated } from "@/lib/api-client";
import type { GearItem } from "@/types/api";

const FEATURES = [
  { icon: Zap,    title: "Book instantly",     desc: "Pick dates, confirm, done. No phone calls." },
  { icon: MapPin, title: "Pick up locally",    desc: "Gear from providers near you." },
  { icon: Shield, title: "Verified listings",  desc: "Every provider is reviewed and trusted." },
];

export default async function HomePage() {
  const { data: featuredGear } = await apiFetchPaginated<GearItem[]>(
    "/gear?limit=8&sortBy=createdAt&sortOrder=desc&status=AVAILABLE"
  ).catch(() => ({ data: [] as GearItem[], meta: undefined }));

  return (
    <div className="overflow-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-trail/12 blur-3xl" />
          <div className="absolute right-1/4 top-24 h-52 w-52 rounded-full bg-blaze/10 blur-3xl" />
        </div>

        <p className="animate-fade-up mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-trail backdrop-blur-sm">
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

      {/* ── Feature cards — footer dark style ─────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="animate-fade-up relative overflow-hidden rounded-2xl border border-white/10 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              style={{
                background: "linear-gradient(135deg, rgba(15,35,24,0.88) 0%, rgba(30,77,53,0.82) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(15,35,24,0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Glow orb behind icon */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-trail-light/20 blur-2xl" />

              <div className="relative mx-auto mb-4 flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <Icon className="size-5 text-blaze" />
              </div>
              <p className="relative font-semibold text-white">{title}</p>
              <p className="relative mt-1.5 text-xs leading-relaxed text-white/55">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured gear ─────────────────────────────────────────────── */}
      {featuredGear.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          {/* Section header — dark pill style */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-pine">
                Recently listed
              </h2>
              <p className="mt-1 text-sm text-slate">Fresh gear from local providers</p>
            </div>
            <Link
              href="/gear"
              className="flex items-center gap-1.5 rounded-full border border-trail/20 bg-trail/8 px-3 py-1.5 text-xs font-medium text-trail transition-all hover:bg-trail/15 hover:border-trail/40"
            >
              View all <ArrowRight className="size-3" />
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
