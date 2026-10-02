import Link from "next/link";
import { ArrowRight, ChevronRight, Star, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GearCard } from "@/components/gear/gear-card";
import { CategoryTiles } from "@/components/gear/category-tiles";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsSection } from "@/components/home/stats-section";
import { HeroSearch } from "@/components/home/hero-search";
import { apiFetchPaginated } from "@/lib/api-client";
import type { GearItem } from "@/types/api";

export default async function HomePage() {
  const { data: featuredGear } = await apiFetchPaginated<GearItem[]>(
    "/gear?limit=8&sortBy=createdAt&sortOrder=desc&status=AVAILABLE",
  ).catch(() => ({ data: [] as GearItem[], meta: undefined }));

  const { data: popularGear } = await apiFetchPaginated<GearItem[]>(
    "/gear?limit=4&sortBy=pricePerDay&sortOrder=asc&status=AVAILABLE",
  ).catch(() => ({ data: [] as GearItem[], meta: undefined }));

  return (
    <div className="overflow-hidden">
      {/* ─────────────────────── HERO ─────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--surface-dark)" }}
      >
        {/* Animated orbs */}
        <div
          className="pointer-events-none absolute -left-48 -top-24 h-[600px] w-[600px] rounded-full opacity-25 animate-orb-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.6) 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-48 bottom-0 h-[480px] w-[480px] rounded-full opacity-20 animate-orb-drift animate-delay-400"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.8) 0%, transparent 70%)",
          }}
        />

        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] dot-grid" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 pb-32 text-center">
          {/* Badge */}
          <div className="animate-hero-badge mb-6 flex items-center justify-center gap-2">
            <Badge
              className="gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 text-xs font-semibold text-amber-400"
              style={{ color: "var(--amber)" }}
            >
              🇧🇩 Bangladesh&apos;s #1 Gear Rental Platform
            </Badge>
          </div>

          {/* Headline — each word animates in */}
          <h1 className="font-display font-bold leading-[1.04]">
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl animate-hero-word"
              style={{ color: "var(--surface-dark-text)" }}
            >
              Rent the Gear.
            </span>
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl animate-hero-word animate-delay-200"
              style={{ color: "var(--amber)" }}
            >
              Live the Adventure.
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed animate-fade-up animate-delay-300"
            style={{ color: "var(--surface-dark-muted)" }}
          >
            Bikes, tents, kayaks, cameras and more — from verified local
            providers across Bangladesh. Book by the day, pick up nearby.
          </p>

          {/* Search */}
          <div className="animate-fade-up animate-delay-400">
            <HeroSearch />
          </div>

          {/* CTA buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 animate-fade-up animate-delay-500">
            <Button
              asChild
              size="lg"
              className="rounded-xl font-semibold shadow-lg active:scale-[0.97]"
              style={{
                background: "var(--amber)",
                color: "var(--green-dim)",
                boxShadow: "0 6px 20px rgba(245,158,11,0.35)",
              }}
            >
              <Link href="/gear">
                Browse All Gear <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl font-semibold active:scale-[0.97]"
              style={{
                borderColor: "rgba(255,255,255,0.20)",
                color: "var(--surface-dark-text)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <Link href="/auth/register?role=PROVIDER">List Your Gear</Link>
            </Button>
          </div>

          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 animate-fade-up animate-delay-600">
            {[
              { icon: Star, value: "4.8★", label: "Avg rating" },
              { icon: Shield, value: "500+", label: "Gear items" },
              { icon: MapPin, value: "10+", label: "Cities" },
            ].map(({ icon: Icon, value, label }, i) => (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <Separator
                    orientation="vertical"
                    className="h-4 opacity-20"
                  />
                )}
                <Icon
                  className="size-3.5 opacity-50"
                  style={{ color: "var(--amber)" }}
                />
                <span
                  className="font-display text-lg font-bold"
                  style={{ color: "var(--amber)" }}
                >
                  {value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--surface-dark-muted)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute inset-x-0 -bottom-1 h-14 overflow-hidden">
          <svg
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            className="h-full w-full"
            style={{ fill: "var(--background)" }}
          >
            <path d="M0,56 L0,28 C180,8 360,0 540,10 C720,20 900,48 1080,44 C1260,40 1350,16 1440,28 L1440,56 Z" />
          </svg>
        </div>
      </section>

      {/* ─────────────────── CATEGORIES ───────────────────────── */}
      <div className="pt-14">
        <CategoryTiles />
      </div>

      {/* ─────────────────── FEATURED GEAR ────────────────────── */}
      {featuredGear.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-8 flex items-end justify-between">
            <div className="animate-fade-up">
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--green)" }}
              >
                Fresh listings
              </p>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Recently Listed
              </h2>
            </div>
            <Link
              href="/gear"
              className="animate-fade-up flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all hover:opacity-80"
              style={{
                borderColor: "rgba(22,163,74,0.25)",
                color: "var(--green)",
                background: "rgba(22,163,74,0.06)",
              }}
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

      {/* ─────────────────── HOW IT WORKS ─────────────────────── */}
      <HowItWorks />

      {/* ─────────────────── BEST VALUE ───────────────────────── */}
      {popularGear.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-8 flex items-end justify-between">
            <div className="animate-fade-up">
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--amber)" }}
              >
                Budget friendly
              </p>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Best Value Rentals
              </h2>
            </div>
            <Link
              href="/gear?sortBy=pricePerDay&sortOrder=asc"
              className="animate-fade-up flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all hover:opacity-80"
              style={{
                borderColor: "rgba(245,158,11,0.25)",
                color: "var(--amber)",
                background: "rgba(245,158,11,0.06)",
              }}
            >
              See deals <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularGear.map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────── STATS ────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <StatsSection />
      </div>

      {/* ─────────────────── CTA BANNER ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, var(--green) 0%, #15803d 50%, var(--green-light) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 animate-float-slow"
            style={{
              background: "radial-gradient(circle, #fff 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-20 animate-float"
            style={{
              background:
                "radial-gradient(circle, var(--amber) 0%, transparent 70%)",
            }}
          />

          <Badge className="mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs text-white/80">
            For gear owners
          </Badge>

          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Turn Your Gear Into Income
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75">
            List your bikes, cameras, tents and other gear. Earn money while
            others enjoy it. Free to list, no upfront cost.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-xl font-semibold shadow-lg active:scale-[0.97]"
              style={{
                background: "var(--amber)",
                color: "var(--green-dim)",
                boxShadow: "0 6px 20px rgba(245,158,11,0.40)",
              }}
            >
              <Link href="/auth/register?role=PROVIDER">
                Start Listing <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Link
              href="/gear"
              className="text-sm font-medium text-white/80 underline-offset-4 hover:underline"
            >
              Browse as customer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
