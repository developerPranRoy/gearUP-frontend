"use client";

import { useState } from "react";
import Link from "next/link";
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

      <div className="flex gap-3">
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          disabled={!stripe || submitting}
        >
          {submitting && <Loader2 className="animate-spin" />}
          Pay ৳{amount.toLocaleString()}
        </Button>
        <Button asChild type="button" size="lg" variant="outline" disabled={submitting}>
          <Link href="/payment/cancel">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}