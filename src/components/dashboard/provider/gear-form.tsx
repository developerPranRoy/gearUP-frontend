"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authedFetch } from "@/lib/api-client";
import { handleFormError } from "@/lib/handle-form-error";
import { gearSchema, type GearInput } from "@/lib/validations/gear";
import type { Category, GearItem } from "@/types/api";

export function GearForm({
  categories,
  gear,
}: {
  categories: Category[];
  gear?: GearItem;
}) {
  const router = useRouter();
  const isEditing = Boolean(gear);

  const form = useForm<GearInput>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: gear?.name ?? "",
      description: gear?.description ?? "",
      brand: gear?.brand ?? "",
      categoryId: gear?.categoryId ?? "",
      pricePerDay: gear?.pricePerDay ?? 0,
      totalStock: gear?.totalStock ?? 1,
      images: gear?.images && gear.images.length > 0 ? gear.images : [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images" as never,
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: GearInput) {
    const payload = {
      ...values,
      images: (values.images ?? []).filter((url) => url.trim().length > 0),
    };

    try {
      if (isEditing && gear) {
        await authedFetch(`/provider/gear/${gear.id}`, {
          method: "PUT",
          body: payload,
        });
        toast.success("Gear updated");
      } else {
        await authedFetch("/provider/gear", { method: "POST", body: payload });
        toast.success("Gear added to your inventory");
      }
      router.push("/dashboard/provider");
      router.refresh();
    } catch (error) {
      handleFormError(error, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Trail Mountain Bike" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="21-speed, great for trails..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Trek" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="h-10 w-full rounded-md border border-input bg-canvas px-3 text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pricePerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per day (৳)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total stock</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
                {isEditing && (
                  <p className="text-xs text-muted-foreground">
                    Currently available: {gear?.availableStock} of {gear?.totalStock}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Image URLs (optional)</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`images.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
            <Plus /> Add another image
          </Button>
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isEditing ? "Save changes" : "Add gear"}
        </Button>
      </form>
    </Form>
  );
}
