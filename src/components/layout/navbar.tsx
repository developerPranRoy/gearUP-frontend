import Link from "next/link";
import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { AccountMenu } from "@/components/layout/account-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { User } from "@/types/api";

/** Logo — always white, sits on fixed-dark navbar */
function GearUpLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="rgba(255,255,255,0.06)" />
      {[0,45,90,135,180,225,270,315].map((a) => (
        <rect key={a} x="18.5" y="1" width="3" height="5" rx="1" fill="rgba(255,255,255,0.70)" transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
      <path d="M12.5 26 L20 14 L27.5 26 Z" fill="rgba(255,255,255,0.92)" />
      <path d="M20 14 L17 19 L20 18 L23 19 Z" fill="#0c1a11" />
      <path d="M14 26 L17.5 20.5 L21 26 Z" fill="rgba(255,255,255,0.40)" />
    </svg>
  );
}

/**
 * Navbar — always dark (uses --surface-dark), independent of theme toggle.
 * Only the ThemeToggle button inside it switches the page theme.
 */
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
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--surface-dark)",
        borderBottom: "1px solid var(--surface-dark-border)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Top shimmer line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-3">

        {/* Brand */}
        <Link href="/" className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-80" aria-label="GearUp home">
          <GearUpLogo className="size-8" />
          <span className="font-display text-lg font-bold tracking-tight" style={{ color: "var(--surface-dark-text)" }}>
            Gear<span style={{ color: "var(--gold)" }}>Up</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex justify-center gap-7 text-sm font-medium">
          {[
            { href: "/",     label: "Home" },
            { href: "/gear", label: "Browse Gear" },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="group relative transition-colors duration-200"
              style={{ color: "var(--surface-dark-muted)" }}
            >
              <span className="group-hover:text-white transition-colors">{label}</span>
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ background: "var(--gold)" }} />
            </Link>
          ))}
        </nav>

        {/* Auth + toggle */}
        <div className="flex items-center justify-end gap-2.5">
          <ThemeToggle />

          {session && profile ? (
            <AccountMenu
              name={profile.name}
              email={profile.email}
              role={session.role}
              avatarUrl={profile.avatarUrl ?? null}
            />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login"
                className="text-sm font-medium transition-colors duration-200 hover:text-white"
                style={{ color: "var(--surface-dark-muted)" }}>
                Log in
              </Link>
              <Link href="/auth/register"
                className="inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.97]"
                style={{ background: "var(--gold)", color: "var(--brand-dim)", boxShadow: "0 4px 12px rgba(245,158,11,0.25)" }}>
                Get started
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
