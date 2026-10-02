import Link from "next/link";
import {
  Bike,
  Tent,
  Waves,
  Dumbbell,
  Camera,
  Mountain,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Globe,
  Share2,
} from "lucide-react";

const GEAR_CATEGORIES = [
  { href: "/gear?category=Cycling", label: "Cycling", icon: Bike },
  { href: "/gear?category=Camping", label: "Camping", icon: Tent },
  { href: "/gear?category=Water Sports", label: "Water Sports", icon: Waves },
  { href: "/gear?category=Fitness", label: "Fitness", icon: Dumbbell },
  { href: "/gear?category=Photography", label: "Photography", icon: Camera },
  { href: "/gear?category=Hiking", label: "Hiking", icon: Mountain },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gear", label: "Browse All Gear" },
  { href: "/gear?sortBy=createdAt&sortOrder=desc", label: "New Arrivals" },
  { href: "/gear?sortBy=pricePerDay&sortOrder=asc", label: "Best Deals" },
  { href: "/auth/register", label: "Create Account" },
  { href: "/auth/register?role=PROVIDER", label: "List Your Gear" },
];

const SUPPORT_LINKS = [
  { href: "#", label: "How It Works" },
  { href: "#", label: "Rental Policy" },
  { href: "#", label: "Payment & Security" },
  { href: "#", label: "FAQs" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

function LogoMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-9"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        fill="rgba(255,255,255,0.06)"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect
          key={a}
          x="18.5"
          y="1"
          width="3"
          height="5"
          rx="1"
          fill="rgba(255,255,255,0.65)"
          transform={`rotate(${a} 20 20)`}
        />
      ))}
      <circle
        cx="20"
        cy="20"
        r="10"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.5"
      />
      <path d="M12.5 26 L20 14 L27.5 26 Z" fill="rgba(255,255,255,0.90)" />
      <path d="M20 14 L17 19 L20 18 L23 19 Z" fill="#0c1a11" />
      <path d="M14 26 L17.5 20.5 L21 26 Z" fill="rgba(255,255,255,0.40)" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden"
      style={{ background: "var(--surface-dark)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(22,163,74,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative border-b"
        style={{ borderColor: "var(--surface-dark-border)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
          <div>
            <p
              className="font-display text-lg font-semibold"
              style={{ color: "var(--surface-dark-text)" }}
            >
              Get notified when fresh gear drops near you
            </p>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--surface-dark-muted)" }}
            >
              New listings, seasonal deals, and provider updates — straight to
              your inbox.
            </p>
          </div>
          <form
            className="flex w-full max-w-sm shrink-0 overflow-hidden rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
              style={{ color: "var(--surface-dark-text)" }}
            />
            <button
              type="submit"
              className="shrink-0 px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--amber)", color: "var(--green-dim)" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group mb-5 inline-flex items-center gap-3"
            >
              <LogoMark />
              <span
                className="font-display text-xl font-bold tracking-tight"
                style={{ color: "var(--surface-dark-text)" }}
              >
                Gear<span style={{ color: "var(--amber)" }}>Up</span>
              </span>
            </Link>

            <p
              className="max-w-[230px] text-sm leading-relaxed"
              style={{ color: "var(--surface-dark-muted)" }}
            >
              Bangladesh&apos;s largest sports and outdoor gear rental platform.
              Rent by the day, pick up locally, return when you&apos;re done.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                {
                  icon: Phone,
                  label: "+880 1700-000000",
                  href: "tel:+8801700000000",
                },
                {
                  icon: Mail,
                  label: "hello@gearup.com",
                  href: "mailto:hello@gearup.com",
                },
                { icon: MapPin, label: "Dhaka, Bangladesh", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-xs transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--surface-dark-subtle)" }}
                  >
                    <Icon
                      className="size-3.5 shrink-0"
                      style={{ color: "var(--amber)" }}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Globe, href: "#", label: "Website" },
                { icon: Share2, href: "#", label: "Share" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "var(--surface-dark-muted)",
                  }}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--amber)" }}
            >
              Gear Categories
            </p>
            <ul className="space-y-2.5">
              {GEAR_CATEGORIES.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2.5 text-sm transition-colors duration-200"
                    style={{ color: "var(--surface-dark-muted)" }}
                  >
                    <span
                      className="flex size-6 items-center justify-center rounded-md transition-all"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon className="size-3" />
                    </span>
                    <span className="group-hover:text-white transition-colors">
                      {label}
                    </span>
                    <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--amber)" }}
            >
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "var(--surface-dark-muted)" }}
                  >
                    <span
                      className="h-px w-3 transition-all group-hover:w-4"
                      style={{ background: "rgba(255,255,255,0.20)" }}
                    />
                    <span className="group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--amber)" }}
            >
              Support
            </p>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "var(--surface-dark-muted)" }}
                  >
                    <span
                      className="h-px w-3 transition-all group-hover:w-4"
                      style={{ background: "rgba(255,255,255,0.20)" }}
                    />
                    <span className="group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 rounded-xl p-3 text-center"
              style={{
                background: "var(--surface-dark-raised)",
                border: "1px solid var(--surface-dark-border)",
              }}
            >
              <p
                className="text-xs font-medium"
                style={{ color: "var(--surface-dark-text)" }}
              >
                📱 App coming soon
              </p>
              <p
                className="mt-0.5 text-[10px]"
                style={{ color: "var(--surface-dark-subtle)" }}
              >
                Android & iOS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--surface-dark-border)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">
          <p
            className="text-xs"
            style={{ color: "var(--surface-dark-subtle)" }}
          >
            © {new Date().getFullYear()} GearUp Bangladesh. All rights reserved.
          </p>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--surface-dark-subtle)" }}
          >
            <span>Made with</span>
            <span style={{ color: "var(--amber)" }}>♥</span>
            <span>in Bangladesh</span>
          </div>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[11px] transition-colors hover:text-white"
                style={{ color: "var(--surface-dark-subtle)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
