import type { Role } from "@/types/api";

// Client-safe (no "server-only" import), unlike lib/auth.ts — both the
// middleware, the BFF routes, and client components need this mapping.
export function dashboardPathForRole(role: Role) {
  switch (role) {
    case "PROVIDER":
      return "/dashboard/provider";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/dashboard/customer";
  }
}
