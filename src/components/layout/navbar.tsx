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
    <header className="border-b border-border bg-black/[0.10] rounded-b-3xl">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-4">
        <div>
          <Link href="/" className="font-display text-lg font-bold text-pine">
            GearUp
          </Link>
        </div>

        <nav className="flex justify-center gap-6 text-sm font-medium">
          <Link href="/" className="text-foreground hover:text-trail">
            Home
          </Link>
          <Link href="/gear" className="text-foreground hover:text-trail">
            Browse Gear
          </Link>
        </nav>

        <div className="flex justify-end">
          {session && profile ? (
            <AccountMenu
              name={profile.name}
              email={profile.email}
              role={session.role}
            />
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-foreground hover:text-trail"
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
