import Link from "next/link";
import { notFound } from "next/navigation";

import { apiFetch, ApiError } from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentForm } from "@/components/payment/payment-form";
import type { RentalOrder } from "@/types/api";

export default async function PayOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getAccessToken();

  let order: RentalOrder;
  try {
    order = await apiFetch<RentalOrder>(`/rentals/${id}`, { token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 font-display text-2xl font-semibold text-pine">
        Complete payment
      </h1>

      {order.status !== "CONFIRMED" ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              This order isn&apos;t ready for payment yet — its status is{" "}
              <strong>{order.status}</strong>.
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/dashboard/customer">Back to your orders</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Order #{order.id.slice(0, 8)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 border-b border-border pb-4 text-sm">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.gearItem?.name ?? "Gear"} × {item.quantity}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    ৳{(item.pricePerDay * item.quantity).toLocaleString()}/day
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-mono text-base font-medium text-pine">
              <span>Total</span>
              <span>৳{order.totalAmount.toLocaleString()}</span>
            </div>

            <PaymentForm orderId={order.id} amount={order.totalAmount} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
