import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";


async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const token = await getAccessToken();
  const targetUrl = `${API_BASE_URL}/${path.join("/")}${request.nextUrl.search}`;

  const hasBody = !["GET", "HEAD", "DELETE"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const backendRes = await fetch(targetUrl, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body,
    cache: "no-store",
  });

  const responseBody = await backendRes.text();

  return new NextResponse(responseBody, {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
