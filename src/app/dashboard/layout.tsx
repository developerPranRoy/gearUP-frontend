import { redirect } from "next/navigation";
import Link from "next/link";

import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { User } from "@/types/api";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();


  if (!session) {
    redirect("/auth/login");
  }

  const token = await getAccessToken();
  const profile = token
    ? await apiFetch<User>("/auth/me", { token }).catch(() => null)
    : null;

  return (
    <div className="flex min-h-screen bg-stone">
      <aside className="flex w-60 flex-col justify-between border-r border-border bg-canvas p-4">
        <div>
          <Link href="/" className="mb-6 block font-display text-lg font-semibold text-pine">
            GearUp
          </Link>
          <Sidebar role={session.role} name={profile?.name ?? session.email} />
        </div>
        <LogoutButton />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
