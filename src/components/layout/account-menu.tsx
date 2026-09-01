"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { bffFetch } from "@/lib/api-client";
import { dashboardPathForRole } from "@/lib/roles";
import type { Role } from "@/types/api";

export function AccountMenu({ name, email, role }: { name: string; email: string; role: Role }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await bffFetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Couldn't log out — try again");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-9 items-center justify-center rounded-full bg-trail text-sm font-bold text-white shadow-md shadow-trail/30 outline-none transition-all hover:bg-trail-light hover:shadow-lg hover:shadow-trail/40 focus-visible:ring-2 focus-visible:ring-trail focus-visible:ring-offset-1">
        {name.charAt(0).toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-strong w-52 rounded-xl border-white/60 p-1.5">
        <DropdownMenuLabel className="px-2 py-2">
          <p className="font-semibold text-pine">{name}</p>
          <p className="text-xs text-slate">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/40" />
        <DropdownMenuItem asChild className="rounded-lg hover:bg-white/60">
          <Link href={dashboardPathForRole(role)} className="flex items-center gap-2">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleLogout}
          className="rounded-lg text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
