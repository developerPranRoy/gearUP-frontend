import Link from "next/link";
import { Bike, Tent, Waves, Dumbbell, ArrowRight, GitFork, Mail, MapPin } from "lucide-react";

const GEAR_LINKS = [
  { href: "/gear?category=Cycling",     label: "Cycling",      icon: Bike },
  { href: "/gear?category=Camping",     label: "Camping",      icon: Tent },
  { href: "/gear?category=Water Sports",label: "Water Sports", icon: Waves },
  { href: "/gear?category=Fitness",     label: "Fitness",      icon: Dumbbell },
];

const COMPANY_LINKS = [
  { href: "/",              label: "Home" },
  { href: "/gear",          label: "Browse Gear" },
  { href: "/auth/register", label: "Create Account" },
  { href: "/auth/register?role=PROVIDER", label: "List Your Gear" },
];

const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Policy" },
];

function GearUpLogoMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect key={angle} x="18.5" y="1" width="3" height="5" rx="1" fill="rgba(255,255,255,0.7)" transform={`rotate(${angle} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M12.5 26 L20 14 L27.5 26 Z" fill="rgba(255,255,255,0.9)" />
      <path d="M20 14 L17 19 L20 18 L23 19 Z" fill="#1e4d35" opacity="0.9" />
      <path d="M14 26 L17.5 20.5 L21 26 Z" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Deep glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pine via-pine-soft to-trail opacity-95" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-trail-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-blaze/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative">
        {/* ── Top wave separator ──────────────────────────────────────── */}
        <div className="absolute inset-x-0 -top-px">
          <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 24 C360 0 1080 0 1440 24 L1440 0 L0 0 Z" fill="rgba(255,255,255,0.06)" />
          </svg>
        </div>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="group inline-flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-md group-hover:bg-white/30 transition-all" />
                  <GearUpLogoMark />
                </div>
                <span className="font-display text-2xl font-bold text-white tracking-tight">
                  Gear<span className="text-blaze">Up</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-white/60 max-w-[220px]">
                Rent sports &amp; outdoor gear from local providers. Book by the day, pick up nearby.
              </p>

              {/* Contact / social pills */}
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href="mailto:hello@gearup.com"
                  className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  <Mail className="size-3.5 shrink-0" />
                  hello@gearup.com
                </a>
                <span className="inline-flex items-center gap-2 text-xs text-white/50">
                  <MapPin className="size-3.5 shrink-0" />
                  Dhaka, Bangladesh
                </span>
                <a
                  href="https://github.com/developerPranRoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  <GitFork className="size-3.5 shrink-0" />
                  github.com/developerPranRoy
                </a>
              </div>
            </div>

            {/* Browse Gear */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-blaze/80">
                Browse Gear
              </p>
              <ul className="space-y-3">
                {GEAR_LINKS.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      <span className="flex size-6 items-center justify-center rounded-md bg-white/8 ring-1 ring-white/10 transition-all group-hover:bg-trail-light/40 group-hover:ring-trail-light/30">
                        <Icon className="size-3.5" />
                      </span>
                      {label}
                      <ArrowRight className="size-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-blaze/80">
                Company
              </p>
              <ul className="space-y-3">
                {COMPANY_LINKS.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      <span className="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-trail-light" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter / CTA glass card */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-blaze/80">
                Stay Updated
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-white/80 leading-snug mb-1">
                  New gear, new adventures.
                </p>
                <p className="text-xs text-white/45 mb-4">
                  Get notified when fresh gear drops near you.
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-trail-light/50 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="button"
                    className="w-full rounded-lg bg-trail-light px-3 py-2 text-xs font-semibold text-white shadow-md shadow-trail/30 transition-all hover:bg-blaze hover:shadow-blaze/30 active:scale-[0.98]"
                  >
                    Notify me
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { value: "500+", label: "Gear items" },
                  { value: "50+",  label: "Providers" },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <p className="font-display text-lg font-bold text-white">{value}</p>
                    <p className="text-[10px] text-white/45">{label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} GearUp. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {LEGAL_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[11px] text-white/35 hover:text-white/65 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
