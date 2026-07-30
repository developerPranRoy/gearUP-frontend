import { notFound } from "next/navigation";

import { apiFetch, ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GearForm } from "@/components/dashboard/provider/gear-form";
import type { Category, GearItem } from "@/types/api";

export default async function EditGearPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getCurrentUser();

  let gear: GearItem;
  try {
    gear = await apiFetch<GearItem>(`/gear/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  // Ownership check: the backend rejects the actual PUT if this isn't your
  // gear, but there's no reason to even show the edit form for someone
  // else's listing.
  if (!session || gear.providerId !== session.id) {
    notFound();
  }

  const categories = await apiFetch<Category[]>("/categories");

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-2xl font-semibold text-pine">Edit gear</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{gear.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <GearForm categories={categories} gear={gear} />
        </CardContent>
      </Card>
    </div>
  );
}
