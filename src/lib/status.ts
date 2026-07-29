

export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type GearStatus = "AVAILABLE" | "UNAVAILABLE";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export type AnyStatus = RentalStatus | PaymentStatus | GearStatus | UserStatus;

type StatusMeta = { label: string; color: string };

export const STATUS_META: Record<AnyStatus, StatusMeta> = {
  PLACED: { label: "Placed", color: "var(--status-placed)" },
  CONFIRMED: { label: "Confirmed", color: "var(--status-confirmed)" },
  PAID: { label: "Paid", color: "var(--status-paid)" },
  PICKED_UP: { label: "Picked Up", color: "var(--status-picked-up)" },
  RETURNED: { label: "Returned", color: "var(--status-returned)" },
  CANCELLED: { label: "Cancelled", color: "var(--status-cancelled)" },
  PENDING: { label: "Pending", color: "var(--status-placed)" },
  COMPLETED: { label: "Completed", color: "var(--status-picked-up)" },
  FAILED: { label: "Failed", color: "var(--status-cancelled)" },
  AVAILABLE: { label: "Available", color: "var(--status-picked-up)" },
  UNAVAILABLE: { label: "Unavailable", color: "var(--status-cancelled)" },
  ACTIVE: { label: "Active", color: "var(--status-picked-up)" },
  SUSPENDED: { label: "Suspended", color: "var(--status-cancelled)" },
};

export const NEXT_PROVIDER_ACTION: Partial<Record<RentalStatus, { action: string; next: RentalStatus }>> = {
  PLACED: { action: "Confirm", next: "CONFIRMED" },
  PAID: { action: "Mark Picked Up", next: "PICKED_UP" },
  PICKED_UP: { action: "Mark Returned", next: "RETURNED" },
};
