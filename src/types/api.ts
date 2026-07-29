export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  exp: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ApiErrorDetail = {
  path: string | number;
  message: string;
};

export type ApiErrorShape = {
  success: false;
  message: string;
  errorDetails: ApiErrorDetail[];
};

export type ApiSuccessShape<T> = {
  success: true;
  message: string;
  meta?: { page: number; limit: number; total: number };
  data: T;
};
