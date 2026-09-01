import Link from "next/link";
import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { AccountMenu } from "@/components/layout/account-menu";
import type { User } from "@/types/api";

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
    <header className="sticky top-0 z-50 glass border-b border-white/60">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-3">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-display text-xl font-bold text-pine tracking-tight hover:text-trail transition-colors"
          >
            Gear<span className="text-trail">Up</span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex justify-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="text-slate hover:text-pine transition-colors relative group"
          >
            Home
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-trail transition-all group-hover:w-full rounded-full" />
          </Link>
          <Link
            href="/gear"
            className="text-slate hover:text-pine transition-colors relative group"
          >
            Browse Gear
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-trail transition-all group-hover:w-full rounded-full" />
          </Link>
        </nav>

        {/* Auth */}
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
                className="text-sm font-medium text-slate hover:text-pine transition-colors"
              >
                Log in
              </Link>
              <Button asChild size="sm">
                <Link href="/auth/register">Get started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
