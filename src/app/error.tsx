"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-status-cancelled">
        Something broke
      </p>
      <h1 className="font-display text-2xl font-semibold text-pine">
        That didn&apos;t work
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        An unexpected error happened loading this page. You can try again, or
        head back home.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
