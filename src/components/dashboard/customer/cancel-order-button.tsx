"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authedFetch, ApiError } from "@/lib/api-client";

export function CancelOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);
    try {
      await authedFetch(`/rentals/${orderId}/cancel`, { method: "PATCH" });
      toast.success("Order cancelled");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't cancel order");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Cancel this order?</span>
        <Button size="sm" variant="destructive" onClick={handleCancel} disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          Yes, cancel
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={loading}>
          Keep it
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" variant="outline" onClick={() => setConfirming(true)}>
      Cancel Order
    </Button>
  );
}
