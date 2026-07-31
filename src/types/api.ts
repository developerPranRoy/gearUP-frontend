export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  exp: number;
};

export type UserStatus = "ACTIVE" | "SUSPENDED";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  status: UserStatus;
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

export type Category = {
  id: string;
  name: string;
  description: string | null;
};

export type GearStatus = "AVAILABLE" | "UNAVAILABLE";

export type Review = {
  id: string;
  rating: number;
  comment: string | null;
  customerId: string;
  gearItemId: string;
  createdAt: string;
};

export type GearItem = {
  id: string;
  name: string;
  description: string | null;
  brand: string | null;
  pricePerDay: number;
  totalStock: number;
  availableStock: number;
  images: string[];
  status: GearStatus;
  categoryId: string;
  category: Category;
  providerId: string;
  provider: { id: string; name: string };
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
};

export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED";

export type RentalOrderItem = {
  id: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: number;
  gearItem?: GearItem;
};

export type RentalOrder = {
  id: string;
  customerId: string;
  customer?: { id: string; name: string; email: string };
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: RentalStatus;
  items: RentalOrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type PaymentMethod = "STRIPE" | "SSLCOMMERZ";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type Payment = {
  id: string;
  transactionId: string;
  rentalOrderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  rentalOrder?: RentalOrder;
};
