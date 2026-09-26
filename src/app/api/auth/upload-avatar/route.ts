import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Forward the multipart/form-data directly to the backend
  const formData = await request.formData();
  const file = formData.get("avatar") as File | null;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
  }

  // Rebuild FormData for the upstream request
  const upstream = new FormData();
  upstream.append("avatar", file, file.name);

  const backendRes = await fetch(`${API_BASE_URL}/auth/me/avatar`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: upstream,
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
