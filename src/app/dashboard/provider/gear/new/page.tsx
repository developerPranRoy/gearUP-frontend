import { apiFetch } from "@/lib/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GearForm } from "@/components/dashboard/provider/gear-form";
import type { Category } from "@/types/api";

export default async function NewGearPage() {
  const categories = await apiFetch<Category[]>("/categories");

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-2xl font-semibold text-pine">Add gear</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gear details</CardTitle>
        </CardHeader>
        <CardContent>
          <GearForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
