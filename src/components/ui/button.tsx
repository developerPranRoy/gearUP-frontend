import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-trail text-white shadow-md shadow-trail/20 hover:bg-trail-light hover:shadow-lg hover:shadow-trail/30 hover:-translate-y-0.5",
        accent:
          "bg-blaze text-pine shadow-md shadow-blaze/20 hover:bg-blaze-dark hover:shadow-lg hover:shadow-blaze/30 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-white shadow-md shadow-destructive/20 hover:opacity-90 hover:-translate-y-0.5",
        outline:
          "border border-border bg-white/60 backdrop-blur-sm hover:bg-white/90 hover:border-trail/40 hover:-translate-y-0.5",
        ghost:
          "hover:bg-white/60 hover:backdrop-blur-sm",
        link:
          "text-trail underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
