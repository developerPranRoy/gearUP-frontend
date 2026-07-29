import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function GearPagination({
  page,
  limit,
  total,
  searchParams,
}: {
  page: number;
  limit: number;
  total: number;
  searchParams: Record<string, string | undefined>;
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (totalPages <= 1) return null;

  function hrefForPage(target: number) {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter(([, v]) => v) as [string, string][]
    );
    params.set("page", String(target));
    return `/gear?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Link
        href={hrefForPage(page - 1)}
        aria-disabled={page <= 1}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          page <= 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>

      <span className="px-3 font-mono text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Link
        href={hrefForPage(page + 1)}
        aria-disabled={page >= totalPages}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          page >= totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}
