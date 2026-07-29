import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { API_BASE_URL } from "@/lib/api-client";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, cookieOptions } from "@/lib/auth";
import type { SessionUser } from "@/types/api";

/**
 * BFF proxy: the Express API returns tokens in the JSON body (it has no
 * concept of browser cookies). This route calls it, then re-issues those
 * tokens as httpOnly cookies so client-side JS — and therefore XSS — never
 * touches them. The browser only ever sees this route's response, which
 * contains the decoded user, never the raw tokens.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(json, { status: backendRes.status });
  }

  const { accessToken, refreshToken } = json.data as {
    accessToken: string;
    refreshToken: string;
  };

  const response = NextResponse.json({
    success: true,
    message: json.message,
    user: decodeJwt(accessToken) as SessionUser,
  });

  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches backend JWT_EXPIRES_IN default
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}
