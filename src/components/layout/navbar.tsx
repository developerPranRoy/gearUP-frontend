import Link from "next/link";
import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { AccountMenu } from "@/components/layout/account-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, LayoutGrid, Info } from "lucide-react";
import type { User } from "@/types/api";

function GearUpLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8 shrink-0" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.30)" strokeWidth="2" fill="rgba(255,255,255,0.05)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="18.5" y="1" width="3" height="5" rx="1" fill="rgba(255,255,255,0.65)" transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <path d="M12.5 26 L20 14 L27.5 26 Z" fill="rgba(255,255,255,0.92)" />
      <path d="M20 14 L17 19 L20 18 L23 19 Z" fill="#0a0f0d" />
      <path d="M14 26 L17.5 20.5 L21 26 Z" fill="rgba(255,255,255,0.38)" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/",              label: "Home",         icon: Home },
  { href: "/gear",          label: "Browse Gear",  icon: LayoutGrid },
  { href: "/#how-it-works", label: "How It Works", icon: Info },
];

export async function Navbar() {
  const session = await getCurrentUser();
  let profile: User | null = null;
  if (session) {
    const token = await getAccessToken();
    profile = token ? await apiFetch<User>("/auth/me", { token }).catch(() => null) : null;
  }

  return (
    <header className="sticky top-0 z-50">
      <div
        style={{
          background: "var(--surface-dark)",
          borderBottom: "1px solid var(--surface-dark-border)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">

          <MobileNav isLoggedIn={!!(session && profile)} />

          <Link href="/" aria-label="GearUp home" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <GearUpLogo />
            <span className="font-display text-lg font-bold tracking-tight" style={{ color: "var(--surface-dark-text)" }}>
              Gear<span style={{ color: "var(--amber)" }}>Up</span>
            </span>
          </Link>

          <Separator orientation="vertical" className="mx-1 h-5 opacity-20 hidden md:block" />

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08]"
                style={{ color: "var(--surface-dark-muted)" }}
              >
                <Icon className="size-4 opacity-60" />
                <span className="group-hover:text-white transition-colors">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {session && profile ? (
              <AccountMenu
                name={profile.name}
                email={profile.email}
                role={session.role}
                avatarUrl={profile.avatarUrl ?? null}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-white/60 hover:text-white hover:bg-white/[0.08]"
                >
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="font-semibold"
                  style={{ background: "var(--amber)", color: "var(--ink)", boxShadow: "0 4px 14px rgba(245,158,11,0.28)" }}
                >
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
