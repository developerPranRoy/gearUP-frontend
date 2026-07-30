"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Users,
  PackageSearch,
  CalendarRange,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Role } from "@/types/api";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  CUSTOMER: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
  ],
  PROVIDER: [
    { href: "/dashboard/provider", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/provider/gear/new",
      label: "Add Gear",
      icon: PlusCircle,
    },
    {
      href: "/dashboard/provider/orders",
      label: "Orders",
      icon: ClipboardList,
    },
  ],
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin?tab=users", label: "Users", icon: Users },
    {
      href: "/dashboard/admin?tab=gear",
      label: "Gear Listings",
      icon: PackageSearch,
    },
    {
      href: "/dashboard/admin?tab=rentals",
      label: "Rentals",
      icon: CalendarRange,
    },
  ],
};

export function Sidebar({ role, name }: { role: Role; name: string }) {
  const pathname = usePathname();
  const items = NAV_BY_ROLE[role];

  return (
    <nav className="flex flex-col gap-1 ">
      <div className="mb-4 px-2  ">
        <p className="font-display text-sm font-semibold text-pine">{name}</p>
        <p className="text-xs capitalize text-muted-foreground">
          {role.toLowerCase()}
        </p>
      </div>

      {items.map((item) => {
        const isActive = pathname === item.href.split("?")[0];
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-trail text-white"
                : "text-foreground hover:bg-muted",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
