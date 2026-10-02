import { Search, CalendarCheck, MapPin, RotateCcw } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Find Your Gear",
    desc: "Search thousands of sports and outdoor gear items from verified local providers across Bangladesh.",
  },
  {
    step: "02",
    icon: CalendarCheck,
    title: "Book & Pay",
    desc: "Pick your rental dates, confirm the booking, and pay securely online in minutes.",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Pick Up Locally",
    desc: "Collect the gear from a nearby provider — no waiting for shipping, no surprises.",
  },
  {
    step: "04",
    icon: RotateCcw,
    title: "Return When Done",
    desc: "Use it, enjoy it, then return it. No long-term commitment, no storage hassle.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-background"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center animate-fade-up">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--green)" }}>
            Simple process
          </p>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Renting gear in Bangladesh has never been easier. Four simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[28px] hidden h-px lg:block"
            style={{ background: "linear-gradient(90deg, transparent, rgba(22,163,74,0.25) 20%, rgba(22,163,74,0.25) 80%, transparent)" }}
          />

          {STEPS.map(({ step, icon: Icon, title, desc }, i) => (
            <div
              key={step}
              className={`animate-fade-up animate-delay-${(i + 1) * 100} group flex flex-col items-center text-center`}
            >
              <div className="relative z-10 mb-5">
                <div
                  className="flex size-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "var(--background)",
                    border: "2px solid rgba(22,163,74,0.30)",
                    boxShadow: "0 0 0 6px rgba(22,163,74,0.07)",
                  }}
                >
                  <Icon className="size-6" style={{ color: "var(--green)" }} />
                </div>
                <span
                  className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: "var(--green)" }}
                >
                  {Number(step)}
                </span>
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
