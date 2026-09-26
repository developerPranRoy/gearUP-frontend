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
      {/* User badge — always dark surface */}
      <div className="mb-4 rounded-xl px-3 py-3"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="truncate text-sm font-semibold" style={{ color: "var(--surface-dark-text)" }}>{name}</p>
        <p className="mt-0.5 text-xs capitalize" style={{ color: "var(--surface-dark-muted)" }}>{role.toLowerCase()}</p>
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
                ? "text-brand-dim shadow-md"
                : "sidebar-nav-item"
            )}
            style={isActive
              ? { background: "var(--gold)", color: "var(--brand-dim)", boxShadow: "0 2px 8px rgba(245,158,11,0.25)" }
              : { color: "var(--surface-dark-muted)" }
            }
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
