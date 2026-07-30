import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-client";

// Plain proxy — register doesn't issue tokens on the backend, so there's no
// cookie to set here. The client redirects to /auth/login on success.
export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
