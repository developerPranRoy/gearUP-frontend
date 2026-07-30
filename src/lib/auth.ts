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

/**
 * Reads the access token straight from the httpOnly cookie. Server
 * Components / Route Handlers use this to call the backend on the user's
 * behalf.
 */
export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

/**
 * Decodes (does NOT cryptographically verify) the JWT to read id/email/role
 * for UI purposes — whose dashboard to render, which nav links to show.
 *
 * This is intentional, not a shortcut: verifying the signature would require
 * sharing the backend's JWT_SECRET with the frontend. The real authorization
 * boundary is the Express API itself — every request it receives re-verifies
 * the token's signature and expiry before touching the database. If someone
 * tampers with a decoded-only token, the backend call simply fails with 401;
 * they never get real data, only a mis-rendered UI shell.
 */
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
