"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getStripe } from "@/lib/stripe-client";
import { authedFetch, ApiError } from "@/lib/api-client";
import { CheckoutForm } from "@/components/payment/checkout-form";

type CreatePaymentResponse = {
  payment: { id: string; amount: number };
  clientSecret: string | null;
};

export function PaymentForm({
  orderId,
  amount,
}: {
  orderId: string;
  amount: number;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    authedFetch<CreatePaymentResponse>("/payments/create", {
      method: "POST",
      body: { rentalOrderId: orderId, method: "STRIPE" },
    })
      .then((result) => {
        if (!cancelled) setClientSecret(result.clientSecret);
      })
      .catch((err) => {
        if (cancelled) return;
        const message =
          err instanceof ApiError ? err.message : "Couldn't start payment";
        setError(message);
        toast.error(message);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (error) {
    return <p className="text-sm font-medium text-destructive">{error}</p>;
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-trail" />
      </div>
    );
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance: { theme: "stripe" } }}
    >
      <CheckoutForm orderId={orderId} amount={amount} />
    </Elements>
  );
}
