"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authedFetch, ApiError } from "@/lib/api-client";
import { NEXT_PROVIDER_ACTION } from "@/lib/status";
import type { RentalStatus } from "@/types/api";

export function UpdateOrderStatusButton({
  orderId,
  status,
}: {
  orderId: string;
  status: RentalStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nextAction = NEXT_PROVIDER_ACTION[status];
  if (!nextAction) return null;

  async function handleUpdate() {
    setLoading(true);
    try {
      await authedFetch(`/provider/orders/${orderId}`, {
        method: "PATCH",
        body: { status: nextAction!.next },
      });
      toast.success(`Order marked ${nextAction!.next.toLowerCase().replace("_", " ")}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't update order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" onClick={handleUpdate} disabled={loading}>
      {loading && <Loader2 className="animate-spin" />}
      {nextAction.action}
    </Button>
  );
}
