"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authedFetch, ApiError } from "@/lib/api-client";
import type { UserStatus } from "@/types/api";

export function UserStatusToggle({ userId, status }: { userId: string; status: UserStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nextStatus: UserStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

  async function handleToggle() {
    setLoading(true);
    try {
      await authedFetch(`/admin/users/${userId}`, {
        method: "PATCH",
        body: { status: nextStatus },
      });
      toast.success(`User ${nextStatus === "ACTIVE" ? "activated" : "suspended"}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't update user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="sm"
      variant={nextStatus === "SUSPENDED" ? "destructive" : "outline"}
      onClick={handleToggle}
      disabled={loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      {nextStatus === "SUSPENDED" ? "Suspend" : "Activate"}
    </Button>
  );
}
