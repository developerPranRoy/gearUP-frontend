"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getStripe } from "@/lib/stripe-client";

type Status = "loading" | "succeeded" | "processing" | "failed";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const orderId = searchParams.get("orderId");
  console.log(clientSecret);
  const [status, setStatus] = useState<Status>(clientSecret ? "loading" : "failed");

  useEffect(() => {
    if (!clientSecret) return;

    getStripe().then(async (stripe) => {
      if (!stripe) return;
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      switch (paymentIntent?.status) {
        case "succeeded":
          setStatus("succeeded");
          break;
        case "processing":
          setStatus("processing");
          break;
        default:
          setStatus("failed");
      }
    });
  }, [clientSecret]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        {status === "loading" && (
          <Loader2 className="size-10 animate-spin text-trail" />
        )}

        {status === "succeeded" && (
          <>
            <CheckCircle2 className="size-12 text-status-picked-up" />
            <div>
              <h1 className="font-display text-xl font-semibold text-pine">
                Payment successful
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your rental is paid — the provider will prepare your gear for
                pickup.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/customer">View your orders</Link>
            </Button>
          </>
        )}

        {status === "processing" && (
          <>
            <Loader2 className="size-10 animate-spin text-trail" />
            <div>
              <h1 className="font-display text-xl font-semibold text-pine">
                Payment processing
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ll update your order as soon as it clears.
              </p>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="size-12 text-status-cancelled" />
            <div>
              <h1 className="font-display text-xl font-semibold text-pine">
                Payment didn&apos;t go through
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                No charge was made. You can try again from your order.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link
                href={
                  orderId
                    ? `/dashboard/customer/orders/${orderId}/pay`
                    : "/dashboard/customer"
                }
              >
                Try again
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone px-4">
      <Suspense>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
