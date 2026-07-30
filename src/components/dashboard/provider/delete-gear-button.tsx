"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authedFetch, ApiError } from "@/lib/api-client";

export function DeleteGearButton({ gearId, gearName }: { gearId: string; gearName: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await authedFetch(`/provider/gear/${gearId}`, { method: "DELETE" });
      toast.success(`${gearName} removed`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't remove gear");
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <Button size="sm" variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          Confirm
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={loading}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button size="icon" variant="ghost" onClick={() => setConfirming(true)} aria-label="Delete">
      <Trash2 className="size-4 text-slate-soft hover:text-destructive" />
    </Button>
  );
}
