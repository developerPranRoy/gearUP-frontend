"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag, Store, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { bffFetch } from "@/lib/api-client";
import { handleFormError } from "@/lib/handle-form-error";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { GoogleLoginButton } from "@/components/auth/google-login-button";

const ROLE_OPTIONS = [
  { value: "CUSTOMER" as const, title: "Rent gear",  description: "Browse and book equipment", icon: ShoppingBag },
  { value: "PROVIDER" as const, title: "List gear",  description: "Rent out your equipment",  icon: Store },
];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pre = searchParams.get("role");
  const defaultRole = pre === "PROVIDER" || pre === "CUSTOMER" ? pre : undefined;

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", phone: "", role: defaultRole },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: RegisterInput) {
    try {
      await bffFetch("/api/auth/register", { method: "POST", body: values });
      toast.success("Account created — sign in to continue");
      router.push("/auth/login");
    } catch (error) {
      handleFormError(error, form.setError);
    }
  }

  return (
    <div className="animate-fade-up w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl" style={{ background: "rgba(22,163,74,0.10)" }}>
          <UserPlus className="size-5" style={{ color: "var(--green)" }} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join GearUp today</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">I want to</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {ROLE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const selected = field.value === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => field.onChange(opt.value)}
                        aria-pressed={selected}
                        className={cn(
                          "flex flex-col items-start gap-1.5 rounded-xl border-2 p-3 text-left transition-all duration-200",
                          selected
                            ? "border-green-600 bg-green-50 shadow-sm dark:bg-green-950/30"
                            : "border-border bg-background hover:border-green-400/50"
                        )}
                      >
                        <Icon className={cn("size-5", selected ? "text-green-600" : "text-muted-foreground")} />
                        <span className="text-sm font-semibold text-foreground">{opt.title}</span>
                        <span className="text-xs text-muted-foreground">{opt.description}</span>
                      </button>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel className="text-foreground">Full name</FormLabel>
                  <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel className="text-foreground">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl><Input placeholder="017..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Password</FormLabel>
                <FormControl><Input type="password" placeholder="At least 6 characters" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-semibold"
            size="lg"
            disabled={isSubmitting}
            style={{ background: "var(--green)", color: "#fff" }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <UserPlus className="size-4" />}
            Create account
          </Button>
        </form>
      </Form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-3 text-muted-foreground rounded-full">or</span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleLoginButton text="signup_with" />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: "var(--green)" }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return <Suspense><RegisterForm /></Suspense>;
}
