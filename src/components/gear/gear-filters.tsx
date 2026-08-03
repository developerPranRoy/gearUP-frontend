"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/api";

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "pricePerDay:asc", label: "Price: Low to High" },
  { value: "pricePerDay:desc", label: "Price: High to Low" },
];

export function GearFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchTerm !== (searchParams.get("searchTerm") ?? "")) {
        updateParams({ searchTerm: searchTerm || null });
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  useEffect(() => {
    const handle = setTimeout(() => {
      const currentMin = searchParams.get("minPrice") ?? "";
      const currentMax = searchParams.get("maxPrice") ?? "";
      if (minPrice !== currentMin || maxPrice !== currentMax) {
        updateParams({ minPrice: minPrice || null, maxPrice: maxPrice || null });
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [minPrice, maxPrice]);

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = `${searchParams.get("sortBy") ?? "createdAt"}:${
    searchParams.get("sortOrder") ?? "desc"
  }`;

  const hasActiveFilters =
    searchParams.get("searchTerm") ||
    searchParams.get("category") ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border pb-6">
      <div className="relative min-w-[220px] flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-soft" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search gear..."
          className="pl-9"
        />
      </div>

      <select
        value={activeCategory}
        onChange={(e) => updateParams({ category: e.target.value || null })}
        className="h-10 rounded-md border border-input bg-canvas px-3 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <Input
        type="number"
        min={0}
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min ৳"
        className="w-24"
      />
      <Input
        type="number"
        min={0}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max ৳"
        className="w-24"
      />

      <select
        value={activeSort}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split(":");
          updateParams({ sortBy, sortOrder });
        }}
        className="h-10 rounded-md border border-input bg-canvas px-3 text-sm"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setMinPrice("");
            setMaxPrice("");
            router.push(pathname);
          }}
        >
          <X /> Clear
        </Button>
      )}

      {isPending && (
        <span className="text-xs text-muted-foreground">Updating…</span>
      )}
    </div>
  );
}
