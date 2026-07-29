"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag, Store, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { bffFetch } from "@/lib/api-client";
import { handleFormError } from "@/lib/handle-form-error";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

const ROLE_OPTIONS = [
  {
    value: "CUSTOMER" as const,
    title: "Rent gear",
    description: "Browse and book equipment from local providers",
    icon: ShoppingBag,
  },
  {
    value: "PROVIDER" as const,
    title: "List gear",
    description: "Rent out your own equipment and manage orders",
    icon: Store,
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: RegisterInput) {
    try {
      await bffFetch("/api/auth/register", { method: "POST", body: values });
      toast.success("Account created — log in to continue");
      router.push("/auth/login");
    } catch (error) {
      handleFormError(error, form.setError);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Join GearUp to rent or list outdoor equipment</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I want to</FormLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLE_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const selected = field.value === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          aria-pressed={selected}
                          className={cn(
                            "flex flex-col items-start gap-2 rounded-md border p-3 text-left transition-colors",
                            selected
                              ? "border-trail bg-trail/5"
                              : "border-border hover:bg-muted"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-5",
                              selected ? "text-trail" : "text-slate-soft"
                            )}
                          />
                          <span className="text-sm font-medium">{option.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pran Roy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="01700000000" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="At least 6 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              Create account
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-trail hover:underline">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
