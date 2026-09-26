import Link from "next/link";
import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { AccountMenu } from "@/components/layout/account-menu";
import type { User } from "@/types/api";

/** GearUp mountain + gear SVG logo mark — white variant for dark nav */
function GearUpLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect key={angle} x="18.5" y="1" width="3" height="5" rx="1" fill="rgba(255,255,255,0.75)" transform={`rotate(${angle} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M12.5 26 L20 14 L27.5 26 Z" fill="rgba(255,255,255,0.95)" />
      <path d="M20 14 L17 19 L20 18 L23 19 Z" fill="#1e4d35" opacity="0.9" />
      <path d="M14 26 L17.5 20.5 L21 26 Z" fill="rgba(255,255,255,0.45)" />
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
    <header className="sticky top-0 z-50 border-b border-white/10" style={{ background: "linear-gradient(135deg, rgba(15,35,24,0.92) 0%, rgba(30,77,53,0.88) 100%)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
      {/* Top highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {/* Bottom glow line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-trail-light/50 to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-3">

        {/* ── Brand ─────────────────────────────────────────────────── */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
            aria-label="GearUp home"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/15 blur-md transition-all group-hover:bg-white/25 group-hover:blur-lg" />
              <GearUpLogo className="relative size-9 drop-shadow-sm" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Gear<span className="text-blaze">Up</span>
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
              className="relative text-white/65 transition-colors duration-200 hover:text-white group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-blaze to-trail-light transition-all duration-300 group-hover:w-full" />
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
                className="text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white"
              >
                Log in
              </Link>
              {/* Blaze amber CTA button */}
              <Link
                href="/auth/register"
                className="inline-flex items-center rounded-lg bg-blaze px-4 py-1.5 text-sm font-semibold text-pine shadow-md shadow-blaze/30 transition-all duration-200 hover:bg-blaze-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blaze/40 active:scale-[0.97]"
              >
                Get started
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
