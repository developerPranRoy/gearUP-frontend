import Link from "next/link";
import { ArrowRight, Zap, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GearCard } from "@/components/gear/gear-card";
import { apiFetchPaginated } from "@/lib/api-client";
import type { GearItem } from "@/types/api";

const FEATURES = [
  { icon: Zap,    title: "Book instantly",    desc: "Pick dates, confirm, done. No phone calls." },
  { icon: MapPin, title: "Pick up locally",   desc: "Gear from providers near you." },
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
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(30,77,53,0.12) 0%, transparent 70%)" }} />
          <div className="absolute right-1/4 top-20 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
        </div>

        {/* Badge */}
        <p className="animate-fade-up mb-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1 font-mono text-xs uppercase tracking-widest"
          style={{ borderColor: "rgba(30,77,53,0.25)", background: "rgba(30,77,53,0.06)", color: "var(--brand)" }}>
          Sports &amp; outdoor gear, on demand
        </p>

        <h1 className="animate-fade-up animate-delay-100 font-display text-5xl font-semibold leading-[1.08] text-foreground sm:text-6xl">
          Rent the gear.
          <br />
          <span style={{ color: "var(--brand)" }}>Skip the ownership.</span>
        </h1>

        <p className="animate-fade-up animate-delay-200 mx-auto mt-6 max-w-lg text-base text-muted-foreground">
          Bikes, tents, kayaks, and fitness equipment from local providers —
          book by the day, pick up nearby, return when you&apos;re done.
        </p>

        <div className="animate-fade-up animate-delay-300 mt-8 flex flex-wrap items-center justify-center gap-4">
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

      {/* ── Feature cards — always use surface-dark (like footer/navbar) ── */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className="animate-fade-up group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--surface-dark)",
                border: "1px solid var(--surface-dark-border)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}
            >
              {/* Icon glow orb */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl"
                style={{ background: "rgba(30,77,53,0.25)" }} />

              <div className="relative mx-auto mb-4 flex size-11 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <Icon className="size-5" style={{ color: "var(--gold)" }} />
              </div>

              <p className="relative text-sm font-semibold" style={{ color: "var(--surface-dark-text)" }}>{title}</p>
              <p className="relative mt-1.5 text-xs leading-relaxed" style={{ color: "var(--surface-dark-muted)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured gear ─────────────────────────────────────────────── */}
      {featuredGear.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Recently listed</h2>
              <p className="mt-1 text-sm text-muted-foreground">Fresh gear from local providers</p>
            </div>
            <Link href="/gear"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:opacity-80"
              style={{ borderColor: "rgba(30,77,53,0.30)", color: "var(--brand)", background: "rgba(30,77,53,0.06)" }}>
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
