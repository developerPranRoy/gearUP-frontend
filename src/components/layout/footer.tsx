import Link from "next/link";
import { Bike, Tent, Waves, Dumbbell, ArrowRight, GitFork, Mail, MapPin } from "lucide-react";

const GEAR_LINKS = [
  { href: "/gear?category=Cycling",      label: "Cycling",      icon: Bike },
  { href: "/gear?category=Camping",      label: "Camping",      icon: Tent },
  { href: "/gear?category=Water Sports", label: "Water Sports", icon: Waves },
  { href: "/gear?category=Fitness",      label: "Fitness",      icon: Dumbbell },
];

const COMPANY_LINKS = [
  { href: "/",                             label: "Home" },
  { href: "/gear",                         label: "Browse Gear" },
  { href: "/auth/register",               label: "Create Account" },
  { href: "/auth/register?role=PROVIDER", label: "List Your Gear" },
];

const LEGAL_LINKS = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Cookies" },
];

/** Logo mark — always white on dark surface */
function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="rgba(255,255,255,0.06)" />
      {[0,45,90,135,180,225,270,315].map((a) => (
        <rect key={a} x="18.5" y="1" width="3" height="5" rx="1" fill="rgba(255,255,255,0.65)" transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" />
      <path d="M12.5 26 L20 14 L27.5 26 Z" fill="rgba(255,255,255,0.90)" />
      <path d="M20 14 L17 19 L20 18 L23 19 Z" fill="#0c1a11" />
      <path d="M14 26 L17.5 20.5 L21 26 Z" fill="rgba(255,255,255,0.40)" />
    </svg>
  );
}

/**
 * Footer — uses fixed `--surface-dark` variables.
 * Color NEVER changes with light/dark theme toggle.
 */
export function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden"
      style={{ background: "var(--surface-dark)" }}
    >
      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow orbs — fixed dark palette */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(30,77,53,0.4) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand ──────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-5 inline-flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-md transition-all"
                  style={{ background: "rgba(255,255,255,0.10)" }} />
                <LogoMark />
              </div>
              <span className="font-display text-xl font-bold tracking-tight"
                style={{ color: "var(--surface-dark-text)" }}>
                Gear<span style={{ color: "var(--gold)" }}>Up</span>
              </span>
            </Link>

            <p className="max-w-[210px] text-sm leading-relaxed"
              style={{ color: "var(--surface-dark-muted)" }}>
              Rent sports &amp; outdoor gear from local providers. Book by the day, pick up nearby.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              {[
                { icon: Mail,    href: "mailto:hello@gearup.com",               label: "hello@gearup.com" },
                { icon: MapPin,  href: "#",                                      label: "Dhaka, Bangladesh" },
                { icon: GitFork, href: "https://github.com/developerPranRoy",    label: "developerPranRoy" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="footer-contact-link inline-flex items-center gap-2 text-xs transition-colors duration-200"
                >
                  <Icon className="size-3.5 shrink-0" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Gear links ─────────────────────────────────────────── */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--gold)" }}>
              Browse Gear
            </p>
            <ul className="space-y-3">
              {GEAR_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <Link href={href}
                    className="group inline-flex items-center gap-2.5 text-sm transition-colors duration-200"
                    style={{ color: "var(--surface-dark-muted)" }}
                  >
                    <span className="flex size-6 items-center justify-center rounded-md transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Icon className="size-3.5" />
                    </span>
                    <span className="group-hover:text-white transition-colors">{label}</span>
                    <ArrowRight className="size-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-50 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company links ──────────────────────────────────────── */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--gold)" }}>
              Company
            </p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href}
                    className="group inline-flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "var(--surface-dark-muted)" }}
                  >
                    <span className="h-px w-3 transition-all group-hover:w-4"
                      style={{ background: "rgba(255,255,255,0.20)" }} />
                    <span className="group-hover:text-white transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter + stats ─────────────────────────────────── */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--gold)" }}>
              Stay Updated
            </p>

            <div className="rounded-xl p-4"
              style={{ background: "var(--surface-dark-raised)", border: "1px solid var(--surface-dark-border)" }}>
              <p className="mb-0.5 text-sm font-medium" style={{ color: "var(--surface-dark-text)" }}>
                New gear, new adventures.
              </p>
              <p className="mb-4 text-xs" style={{ color: "var(--surface-dark-subtle)" }}>
                Get notified when fresh gear drops near you.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg px-3 py-2 text-xs outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "var(--surface-dark-text)",
                  }}
                />
                <button type="button"
                  className="w-full rounded-lg px-3 py-2 text-xs font-semibold transition-all active:scale-[0.98] hover:opacity-90"
                  style={{ background: "var(--brand)", color: "#ffffff" }}>
                  Notify me
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[{ value: "500+", label: "Gear items" }, { value: "50+", label: "Providers" }].map(({ value, label }) => (
                <div key={label} className="rounded-xl p-3 text-center"
                  style={{ background: "var(--surface-dark-raised)", border: "1px solid var(--surface-dark-border)" }}>
                  <p className="font-display text-lg font-bold" style={{ color: "var(--surface-dark-text)" }}>{value}</p>
                  <p className="text-[10px]" style={{ color: "var(--surface-dark-subtle)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--surface-dark-border)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">
          <p className="text-xs" style={{ color: "var(--surface-dark-subtle)" }}>
            © {new Date().getFullYear()} GearUp. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link key={label} href={href}
                className="text-[11px] transition-colors hover:text-white"
                style={{ color: "var(--surface-dark-subtle)" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
