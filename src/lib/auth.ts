import "server-only";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import type { SessionUser } from "@/types/api";

export { dashboardPathForRole } from "@/lib/roles";

export const ACCESS_TOKEN_COOKIE = "gearup_access_token";
export const REFRESH_TOKEN_COOKIE = "gearup_refresh_token";

const isProd = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};


export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const payload = decodeJwt(token) as SessionUser;
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
