"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { bffFetch } from "@/lib/api-client";
import { handleFormError } from "@/lib/handle-form-error";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import type { SessionUser } from "@/types/api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: LoginInput) {
    try {
      await bffFetch<{ user: SessionUser }>("/api/auth/login", {
        method: "POST",
        body: values,
      });
      toast.success("Welcome back!");
      router.push(redirectTo || "/");
      router.refresh();
    } catch (error) {
      handleFormError(error, form.setError);
    }
  }

  return (
    <div className="animate-fade-up w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl" style={{ background: "rgba(22,163,74,0.10)" }}>
          <LogIn className="size-5" style={{ color: "var(--green)" }} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your GearUp account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
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
            {isSubmitting ? <Loader2 className="animate-spin" /> : <LogIn className="size-4" />}
            Sign in
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
        <GoogleLoginButton text="signin_with" />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-semibold hover:underline" style={{ color: "var(--green)" }}>
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
