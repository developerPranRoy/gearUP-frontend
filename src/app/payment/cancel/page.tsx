import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone px-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <XCircle className="size-12 text-status-cancelled" />
          <div>
            <h1 className="font-display text-xl font-semibold text-pine">
              Payment cancelled
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              No charge was made. Your order is still waiting to be paid.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/customer">Back to your orders</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
