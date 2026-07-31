import type { Role } from "@/types/api";


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
