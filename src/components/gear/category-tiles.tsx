import Link from "next/link";
import { Bike, Tent, Waves, Dumbbell, Camera, Backpack, Zap, Mountain } from "lucide-react";
import { Card } from "@/components/ui/card";

const CATEGORIES = [
  { label: "Cycling",      href: "/gear?category=Cycling",      icon: Bike },
  { label: "Camping",      href: "/gear?category=Camping",      icon: Tent },
  { label: "Water Sports", href: "/gear?category=Water Sports", icon: Waves },
  { label: "Fitness",      href: "/gear?category=Fitness",      icon: Dumbbell },
  { label: "Photography",  href: "/gear?category=Photography",  icon: Camera },
  { label: "Hiking",       href: "/gear?category=Hiking",       icon: Mountain },
  { label: "Adventure",    href: "/gear?category=Adventure",    icon: Backpack },
  { label: "Electronics",  href: "/gear?category=Electronics",  icon: Zap },
];

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="mb-8 text-center animate-fade-up">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--green)" }}>
          What do you need?
        </p>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Browse by Category
        </h2>
      </div>

      <div className="stagger grid grid-cols-4 gap-3 sm:grid-cols-8">
        {CATEGORIES.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className="animate-fade-up group">
            <Card className="flex flex-col items-center gap-2.5 rounded-2xl p-4 text-center
              border border-border transition-all duration-300
              hover:-translate-y-1 hover:border-green/40 hover:shadow-md cursor-pointer">
              <div
                className="flex size-11 items-center justify-center rounded-xl
                  transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.18)" }}
              >
                <Icon className="size-5" style={{ color: "var(--green)" }} />
              </div>
              <span className="text-[11px] font-semibold leading-tight text-foreground">
                {label}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
