"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authedFetch, ApiError } from "@/lib/api-client";
import type { GearStatus } from "@/types/api";

export function ToggleAvailabilityButton({
  gearId,
  status,
}: {
  gearId: string;
  status: GearStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nextStatus: GearStatus = status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

  async function handleToggle() {
    setLoading(true);
    try {
      await authedFetch(`/provider/gear/${gearId}`, {
        method: "PUT",
        body: { status: nextStatus },
      });
      toast.success(`Marked ${nextStatus === "AVAILABLE" ? "available" : "unavailable"}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleToggle} disabled={loading}>
      {loading && <Loader2 className="animate-spin" />}
      Mark {nextStatus === "AVAILABLE" ? "Available" : "Unavailable"}
    </Button>
  );
}
