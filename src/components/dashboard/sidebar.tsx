"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard, PlusCircle, ClipboardList,
  Users, PackageSearch, CalendarRange, Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/api";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  CUSTOMER: [
    { href: "/dashboard/customer", label: "My Rentals", icon: LayoutDashboard },
  ],
  PROVIDER: [
    { href: "/dashboard/provider",           label: "Overview",   icon: LayoutDashboard },
    { href: "/dashboard/provider/inventory", label: "My Gear",    icon: Package },
    { href: "/dashboard/provider/gear/new",  label: "Add Gear",   icon: PlusCircle },
    { href: "/dashboard/provider/orders",    label: "Orders",     icon: ClipboardList },
  ],
  ADMIN: [
    { href: "/dashboard/admin",              label: "Overview",    icon: LayoutDashboard },
    { href: "/dashboard/admin?tab=users",    label: "Users",       icon: Users },
    { href: "/dashboard/admin?tab=gear",     label: "Gear",        icon: PackageSearch },
    { href: "/dashboard/admin?tab=rentals",  label: "Rentals",     icon: CalendarRange },
  ],
};

export function Sidebar({ role, name }: { role: Role; name: string }) {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const currentTab   = searchParams.get("tab");
  const items        = NAV_BY_ROLE[role];

  return (
    <nav className="space-y-1">
      {/* User badge — dark footer style */}
      <div className="mb-4 rounded-xl border border-white/10 bg-white/8 px-3 py-3"
        style={{ background: "rgba(255,255,255,0.06)" }}>
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        <p className="mt-0.5 text-xs capitalize text-white/50">{role.toLowerCase()}</p>
      </div>

      {items.map((item) => {
        const [itemPath, itemQuery] = item.href.split("?");
        const itemTab = itemQuery ? new URLSearchParams(itemQuery).get("tab") : null;
        const isActive = pathname === itemPath && itemTab === currentTab;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-blaze text-pine shadow-md shadow-blaze/30"
                : "text-white/60 hover:bg-white/8 hover:text-white"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
