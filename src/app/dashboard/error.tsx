"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <AlertTriangle className="size-10 text-status-cancelled" />
      <div>
        <h2 className="font-display text-xl font-semibold text-pine">
          Couldn&apos;t load this page
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Something went wrong fetching your data. Your session might have
          expired, or the server hiccupped.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Log in again</Link>
        </Button>
      </div>
    </div>
  );
}
