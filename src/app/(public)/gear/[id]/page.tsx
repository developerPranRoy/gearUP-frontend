import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Package, Star, User } from "lucide-react";

import { apiFetch, ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/auth";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { RentNow } from "@/components/gear/rent-now";
import type { GearItem } from "@/types/api";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let gear: GearItem;
  try {
    gear = await apiFetch<GearItem>(`/gear/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const session = await getCurrentUser();
  const image = gear.images?.[0];
  const avgRating =
    gear.reviews && gear.reviews.length > 0
      ? gear.reviews.reduce((sum, r) => sum + r.rating, 0) / gear.reviews.length
      : null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone">
            {image ? (
              <Image src={image} alt={gear.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="size-14 text-slate-soft" />
              </div>
            )}
          </div>

          {gear.reviews && gear.reviews.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 font-display text-lg font-semibold text-pine">
                Reviews ({gear.reviews.length})
              </h2>
              <div className="space-y-3">
                {gear.reviews.map((review) => (
                  <div key={review.id} className="rounded-md border border-border p-3">
                    <div className="mb-1 flex items-center gap-1 text-blaze">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5"
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-trail">
            {gear.category.name}
          </p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <h1 className="font-display text-3xl font-semibold text-pine">
              {gear.name}
            </h1>
            <StatusBadge status={gear.status} />
          </div>

          {avgRating && (
            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="size-4 fill-blaze text-blaze" />
              {avgRating.toFixed(1)} ({gear.reviews?.length} reviews)
            </div>
          )}

          {gear.brand && (
            <p className="mt-3 text-sm text-muted-foreground">Brand: {gear.brand}</p>
          )}

          {gear.description && (
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              {gear.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <User className="size-4" />
            Listed by {gear.provider.name}
          </div>

          <p className="mt-6 font-mono text-2xl font-semibold text-pine">
            ৳{gear.pricePerDay.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">/day</span>
          </p>

          <div className="mt-6">
            {gear.status !== "AVAILABLE" || gear.availableStock < 1 ? (
              <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
                This gear isn&apos;t available to rent right now.
              </p>
            ) : !session ? (
              <div className="rounded-md border border-border bg-canvas p-5 text-center">
                <p className="mb-3 text-sm text-muted-foreground">
                  Log in as a customer to rent this gear.
                </p>
                <Button asChild>
                  <Link href={`/auth/login?redirect=/gear/${gear.id}`}>Log in</Link>
                </Button>
              </div>
            ) : session.role !== "CUSTOMER" ? (
              <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
                Only customer accounts can rent gear.
              </p>
            ) : (
              <RentNow
                gearItemId={gear.id}
                pricePerDay={gear.pricePerDay}
                availableStock={gear.availableStock}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
