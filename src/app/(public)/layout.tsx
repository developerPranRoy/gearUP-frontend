import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { dashboardPathForRole } from "@/lib/roles";
import { Button } from "@/components/ui/button";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-canvas">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-lg font-semibold text-pine">
            GearUp
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/gear" className="text-foreground hover:text-trail">
              Browse Gear
            </Link>
            {session ? (
              <Button asChild size="sm">
                <Link href={dashboardPathForRole(session.role)}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/auth/login" className="text-foreground hover:text-trail">
                  Log in
                </Link>
                <Button asChild size="sm">
                  <Link href="/auth/register">Get started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        GearUp — Rent Sports &amp; Outdoor Gear Instantly
      </footer>
    </div>
  );
}
