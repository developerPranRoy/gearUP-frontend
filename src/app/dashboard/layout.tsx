import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

import { getAccessToken, getCurrentUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api-client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { User } from "@/types/api";
import { Navbar } from "@/components/layout/navbar";

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
    <div className="min-h-screen bg-stone">
      <Navbar />

      <div className="flex">
        <aside className="w-60 border-r border-border bg-canvas p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar
              role={session.role}
              name={profile?.name ?? session.email}
            />
          </Suspense>

          <div className="mt-auto">
            <LogoutButton />
            
          </div>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
