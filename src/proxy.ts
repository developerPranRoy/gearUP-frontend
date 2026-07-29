import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import type { SessionUser } from "@/types/api";
import { dashboardPathForRole } from "@/lib/roles";

const ACCESS_TOKEN_COOKIE = "gearup_access_token";

const ROLE_FOR_SEGMENT: Record<string, SessionUser["role"]> = {
  customer: "CUSTOMER",
  provider: "PROVIDER",
  admin: "ADMIN",
};

function readSession(request: NextRequest): SessionUser | null {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = decodeJwt(token) as SessionUser;
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = readSession(request);

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Already logged in, don't show them the login/register form again.
  if (isAuthPage && session) {
    return NextResponse.redirect(
      new URL(dashboardPathForRole(session.role), request.url)
    );
  }

  if (isDashboardPage) {
    if (!session) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const segment = pathname.split("/")[2]; // "customer" | "provider" | "admin"
    const requiredRole = ROLE_FOR_SEGMENT[segment];

    if (requiredRole && session.role !== requiredRole) {
      return NextResponse.redirect(
        new URL(dashboardPathForRole(session.role), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};
