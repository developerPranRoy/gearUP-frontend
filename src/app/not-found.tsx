import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="glass-card animate-fade-up rounded-2xl px-12 py-14 max-w-sm w-full">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-trail/10">
          <Compass className="size-7 text-trail" />
        </div>
        <p className="font-mono text-5xl font-bold text-pine">404</p>
        <h1 className="mt-2 font-display text-xl font-semibold text-pine">Page not found</h1>
        <p className="mt-2 text-sm text-slate">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
