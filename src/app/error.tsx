"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error, reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="glass-card animate-fade-up rounded-2xl px-12 py-14 max-w-sm w-full">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="size-7 text-destructive" />
        </div>
        <h1 className="font-display text-xl font-semibold text-pine">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate">
          An unexpected error occurred. You can try again or head back home.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild><Link href="/">Go home</Link></Button>
        </div>
      </div>
    </div>
  );
}
