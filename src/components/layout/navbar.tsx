import Link from "next/link";
import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { AccountMenu } from "@/components/layout/account-menu";
import type { User } from "@/types/api";

/** GearUp mountain + gear SVG logo mark */
function GearUpLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer gear ring */}
      <circle cx="20" cy="20" r="18" stroke="#1e4d35" strokeWidth="2.5" fill="rgba(30,77,53,0.08)" />

      {/* Gear teeth — 8 teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="18.5"
          y="1"
          width="3"
          height="5"
          rx="1"
          fill="#1e4d35"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}

      {/* Inner circle */}
      <circle cx="20" cy="20" r="10" fill="rgba(30,77,53,0.12)" stroke="#1e4d35" strokeWidth="1.5" />

      {/* Mountain peak inside gear */}
      <path
        d="M12.5 26 L20 14 L27.5 26 Z"
        fill="#1e4d35"
        opacity="0.9"
      />
      {/* Snow cap */}
      <path
        d="M20 14 L17 19 L20 18 L23 19 Z"
        fill="#f4f6f0"
        opacity="0.95"
      />
      {/* Small sub-peak */}
      <path
        d="M14 26 L17.5 20.5 L21 26 Z"
        fill="#2d7050"
        opacity="0.6"
      />
    </svg>
  );
}

export async function Navbar() {
  const session = await getCurrentUser();

  let profile: User | null = null;
  if (session) {
    const token = await getAccessToken();
    profile = token
      ? await apiFetch<User>("/auth/me", { token }).catch(() => null)
      : null;
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/50">
      {/* Subtle inner highlight line at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-3">

        {/* ── Brand ─────────────────────────────────────────────────── */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
            aria-label="GearUp home"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-trail/20 blur-md transition-all group-hover:bg-trail/30 group-hover:blur-lg" />
              <GearUpLogo className="relative size-9 drop-shadow-sm" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-pine">
              Gear<span className="text-trail">Up</span>
            </span>
          </Link>
        </div>

        {/* ── Nav links ─────────────────────────────────────────────── */}
        <nav className="flex justify-center gap-7 text-sm font-medium">
          {[
            { href: "/",     label: "Home" },
            { href: "/gear", label: "Browse Gear" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-slate transition-colors duration-200 hover:text-pine group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-trail to-trail-light transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* ── Auth ──────────────────────────────────────────────────── */}
        <div className="flex justify-end">
          {session && profile ? (
            <AccountMenu
              name={profile.name}
              email={profile.email}
              role={session.role}
            />
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate transition-colors duration-200 hover:text-pine"
              >
                Log in
              </Link>
              <Button asChild size="sm" className="glow-trail">
                <Link href="/auth/register">Get started</Link>
              </Button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
