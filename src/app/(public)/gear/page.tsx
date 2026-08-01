import { PackageX } from "lucide-react";

import { apiFetch, apiFetchPaginated } from "@/lib/api-client";
import { GearCard } from "@/components/gear/gear-card";
import { GearFilters } from "@/components/gear/gear-filters";
import { GearPagination } from "@/components/gear/pagination";
import type { Category, GearItem } from "@/types/api";

type SearchParams = { [key: string]: string | string[] | undefined };

function toQueryString(searchParams: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}

export default async function BrowseGearPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const rawParams = await searchParams;
  const params = {
    searchTerm: rawParams.searchTerm as string | undefined,
    category: rawParams.category as string | undefined,
    brand: rawParams.brand as string | undefined,
    minPrice: rawParams.minPrice as string | undefined,
    maxPrice: rawParams.maxPrice as string | undefined,
   
    status: "AVAILABLE",
    sortBy: (rawParams.sortBy as string | undefined) ?? "createdAt",
    sortOrder: (rawParams.sortOrder as string | undefined) ?? "desc",
    page: (rawParams.page as string | undefined) ?? "1",
    limit: "12",
  };

  const [categories, gearResult] = await Promise.all([
    apiFetch<Category[]>("/categories"),
    apiFetchPaginated<GearItem[]>(`/gear?${toQueryString(params)}`),
  ]);

  const gear = gearResult.data;
  const meta = gearResult.meta ?? { page: 1, limit: 12, total: gear.length };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-pine">Browse gear</h1>
        <p className="text-sm text-muted-foreground">
          {meta.total} {meta.total === 1 ? "item" : "items"} available to rent
        </p>
      </div>

      <GearFilters categories={categories} />

      {gear.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <PackageX className="size-10 text-slate-soft" />
          <p className="font-medium text-pine">No gear matches these filters</p>
          <p className="text-sm text-muted-foreground">
            Try widening your search or clearing a filter.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gear.map((item) => (
              <GearCard key={item.id} gear={item} />
            ))}
          </div>

          <GearPagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            searchParams={params}
          />
        </>
      )}
    </div>
  );
}
