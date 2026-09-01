import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/70 bg-white/60 backdrop-blur-sm px-3 py-2 text-sm text-foreground shadow-sm transition-all duration-200",
        "placeholder:text-slate-soft",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trail/50 focus-visible:border-trail/50 focus-visible:bg-white/80",
        "hover:border-trail/30 hover:bg-white/70",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        className
      )}
      {...props}
    />
  );
}

export { Input };
