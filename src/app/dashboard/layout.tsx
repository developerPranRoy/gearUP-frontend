import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { User } from "@/types/api";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  if (!session) redirect("/auth/login");

  const token = await getAccessToken();
  const profile = token
    ? await apiFetch<User>("/auth/me", { token }).catch(() => null)
    : null;

  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/10" style={{ background: "linear-gradient(180deg, rgba(15,35,24,0.95) 0%, rgba(26,53,40,0.95) 100%)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
        {/* Brand */}
        <div className="border-b border-white/10 px-5 py-4">
          <p className="font-display text-lg font-bold text-white">
            Gear<span className="text-blaze">Up</span>
          </p>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto p-3">
          <Suspense>
            <Sidebar role={session.role} name={profile?.name ?? session.email} />
          </Suspense>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <LogoutButton />
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="ml-60 flex-1 p-8">
        <div className="animate-fade-up">{children}</div>
      </main>
    </div>
  );
}
