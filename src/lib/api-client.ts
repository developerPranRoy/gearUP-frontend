import type { ApiErrorShape, ApiSuccessShape } from "@/types/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  errorDetails: ApiErrorShape["errorDetails"];
  status: number;

  constructor(status: number, body: ApiErrorShape) {
    super(body.message || "Something went wrong");
    this.name = "ApiError";
    this.status = status;
    this.errorDetails = body.errorDetails ?? [];
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};


export async function apiFetch<T>(
  path: string,
  { body, token, headers, ...init }: ApiFetchOptions = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: init.cache ?? "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json ?? { success: false, message: "Request failed", errorDetails: [] }
    );
  }

  return (json as ApiSuccessShape<T>).data;
}


export async function apiFetchPaginated<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<{ data: T; meta?: ApiSuccessShape<T>["meta"] }> {
  const { body, token, headers, ...init } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: init.cache ?? "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json ?? { success: false, message: "Request failed", errorDetails: [] }
    );
  }

  const success = json as ApiSuccessShape<T>;
  return { data: success.data, meta: success.meta };
}


export async function authedFetch<T = unknown>(
  path: string,
  { body, headers, ...init }: Omit<ApiFetchOptions, "token"> = {}
): Promise<T> {
  const res = await fetch(`/api/proxy${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json ?? { success: false, message: "Request failed", errorDetails: [] }
    );
  }

  return (json as ApiSuccessShape<T>).data;
}


export async function bffFetch<T = unknown>(
  path: string,
  { body, headers, ...init }: Omit<ApiFetchOptions, "token"> = {}
): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json ?? { success: false, message: "Request failed", errorDetails: [] }
    );
  }

  return json as T;
}
