import { Package, Users, Star, MapPin } from "lucide-react";

const STATS = [
  {
    icon: Package,
    value: "500+",
    label: "Gear Items",
    desc: "Bikes, tents, kayaks & more",
  },
  {
    icon: Users,
    value: "50+",
    label: "Verified Providers",
    desc: "Trusted local owners",
  },
  {
    icon: Star,
    value: "4.8",
    label: "Average Rating",
    desc: "From 200+ customer reviews",
  },
  { icon: MapPin, value: "10+", label: "Cities", desc: "Across Bangladesh" },
];

export function StatsSection() {
  return (
    <section
      className="overflow-hidden rounded-3xl"
      style={{ background: "var(--surface-dark)" }}
    >
      <div className="relative px-8 py-14">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-20 animate-orb-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.7) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-15 animate-orb-drift animate-delay-500"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <div className="mb-10 text-center animate-fade-up">
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--amber)" }}
            >
              By the numbers
            </p>
            <h2
              className="font-display text-2xl font-semibold"
              style={{ color: "var(--surface-dark-text)" }}
            >
              Trusted by Adventurers Across Bangladesh
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label, desc }, i) => (
              <div
                key={label}
                className={`animate-count-up animate-delay-${(i + 1) * 100} group text-center`}
              >
                <div
                  className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <Icon className="size-5" style={{ color: "var(--amber)" }} />
                </div>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: "var(--surface-dark-text)" }}
                >
                  {value}
                </p>
                <p
                  className="mt-0.5 text-sm font-semibold"
                  style={{ color: "var(--amber)" }}
                >
                  {label}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--surface-dark-subtle)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
