"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authedFetch, ApiError } from "@/lib/api-client";
import type { RentalOrder } from "@/types/api";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function RentNow({
  gearItemId,
  pricePerDay,
  availableStock,
}: {
  gearItemId: string;
  pricePerDay: number;
  availableStock: number;
}) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 0;
  }, [startDate, endDate]);

  const total = days * quantity * pricePerDay;
  const canSubmit = days > 0 && quantity >= 1 && quantity <= availableStock;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await authedFetch<RentalOrder>("/rentals", {
        method: "POST",
        body: {
          startDate,
          endDate,
          items: [{ gearItemId, quantity }],
        },
      });
      toast.success("Rental order placed — waiting on provider confirmation");
      router.push("/dashboard/customer");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Couldn't place the order. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-canvas p-5">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="startDate">Start date</Label>
          <Input
            id="startDate"
            type="date"
            min={todayISO()}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              if (endDate && e.target.value >= endDate) setEndDate("");
            }}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endDate">End date</Label>
          <Input
            id="endDate"
            type="date"
            min={startDate || todayISO()}
            value={endDate}
            disabled={!startDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quantity">Quantity ({availableStock} available)</Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          max={availableStock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      {days > 0 && (
        <div className="flex items-center justify-between border-t border-border pt-3 font-mono text-sm">
          <span className="text-muted-foreground">
            {days} {days === 1 ? "day" : "days"} × {quantity} × ৳{pricePerDay}
          </span>
          <span className="font-medium text-pine">৳{total.toLocaleString()}</span>
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={!canSubmit || submitting}
        onClick={handleSubmit}
      >
        {submitting && <Loader2 className="animate-spin" />}
        Rent Now
      </Button>
    </div>
  );
}
