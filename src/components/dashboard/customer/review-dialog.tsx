"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { authedFetch } from "@/lib/api-client";
import { handleFormError } from "@/lib/handle-form-error";
import { reviewSchema, type ReviewInput } from "@/lib/validations/review";

export function ReviewDialog({
  gearItemId,
  gearName,
}: {
  gearItemId: string;
  gearName: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ReviewInput) {
    try {
      await authedFetch("/reviews", {
        method: "POST",
        body: { gearItemId, ...values },
      });
      toast.success("Review submitted — thanks!");
      form.reset();
      setSelectedRating(0);
      setOpen(false);
      setSubmitted(true);
    } catch (error) {
      handleFormError(error, form.setError);
    }
  }

  if (submitted) {
    return (
      <span className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">
        Reviewed ✓
      </span>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Leave Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {gearName}</DialogTitle>
          <DialogDescription>
            How was your experience with this gear?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setSelectedRating(value);
                    form.setValue("rating", value, { shouldValidate: true });
                  }}
                  aria-label={`${value} star`}
                >
                  <Star
                    className={cn(
                      "size-7 transition-colors",
                      value <= selectedRating ? "fill-blaze text-blaze" : "text-line"
                    )}
                  />
                </button>
              );
            })}
          </div>
          {form.formState.errors.rating && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.rating.message}
            </p>
          )}

          <Textarea
            placeholder="Optional comment..."
            {...form.register("comment")}
          />

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              Submit review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
