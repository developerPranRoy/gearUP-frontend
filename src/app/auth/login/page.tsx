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
    <div className="glass-card animate-fade-up w-full max-w-md rounded-2xl p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-trail/10">
          <LogIn className="size-5 text-trail" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-pine">Welcome back</h1>
        <p className="mt-1 text-sm text-slate">Sign in to your GearUp account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pine">Email</FormLabel>
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
                <FormLabel className="text-pine">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <LogIn className="size-4" />}
            Sign in
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-slate">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-semibold text-trail hover:underline">
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
