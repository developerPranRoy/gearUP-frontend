"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CheckoutForm({
  orderId,
  amount,
}: {
  orderId: string;
  amount: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?orderId=${orderId}`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Try a different card.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />

      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || submitting}
      >
        {submitting && <Loader2 className="animate-spin" />}
        Pay ৳{amount.toLocaleString()}
      </Button>
    </form>
  );
}
