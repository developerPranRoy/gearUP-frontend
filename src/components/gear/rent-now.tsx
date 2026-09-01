"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authedFetch, ApiError } from "@/lib/api-client";
import type { RentalOrder } from "@/types/api";

const todayISO = () => new Date().toISOString().split("T")[0];

export function RentNow({
  gearItemId, pricePerDay, availableStock,
}: { gearItemId: string; pricePerDay: number; availableStock: number }) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate,   setEndDate]   = useState("");
  const [quantity,  setQuantity]  = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000;
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
        body: { startDate, endDate, items: [{ gearItemId, quantity }] },
      });
      toast.success("Order placed — waiting for provider confirmation");
      router.push("/dashboard/customer");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Couldn't place order. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-white/40 pb-3">
        <CalendarDays className="size-4 text-trail" />
        <p className="text-sm font-semibold text-pine">Book this gear</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="startDate" className="text-xs font-medium text-slate">Start date</Label>
          <Input id="startDate" type="date" min={todayISO()} value={startDate}
            onChange={(e) => { setStartDate(e.target.value); if (endDate && e.target.value >= endDate) setEndDate(""); }}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endDate" className="text-xs font-medium text-slate">End date</Label>
          <Input id="endDate" type="date" min={startDate || todayISO()} value={endDate}
            disabled={!startDate} onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="qty" className="text-xs font-medium text-slate">
          Quantity <span className="text-slate-soft">({availableStock} available)</span>
        </Label>
        <Input id="qty" type="number" min={1} max={availableStock} value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      {startDate && endDate && days === 0 && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          End date must be after start date.
        </p>
      )}

      {days > 0 && (
        <div className="rounded-xl bg-trail/5 px-4 py-3">
          <div className="flex justify-between text-xs text-slate">
            <span>{days} day{days > 1 ? "s" : ""} × {quantity} × ৳{pricePerDay.toLocaleString()}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-sm font-semibold text-pine">Total</span>
            <span className="font-mono text-sm font-bold text-trail">৳{total.toLocaleString()}</span>
          </div>
        </div>
      )}

      <Button className="w-full" size="lg" disabled={!canSubmit || submitting} onClick={handleSubmit}>
        {submitting ? <Loader2 className="animate-spin" /> : <ShoppingCart className="size-4" />}
        Rent Now
      </Button>
    </div>
  );
}
