import { z } from "zod";

export const gearSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  brand: z.string().optional(),
  categoryId: z.string().min(1, "Select a category"),
  pricePerDay: z.coerce.number().positive("Must be greater than 0"),
  totalStock: z.coerce.number().int().positive("Must be at least 1"),

  images: z
    .array(z.union([z.string().url("Must be a valid URL"), z.literal("")]))
    .optional(),
});

export type GearInput = z.infer<typeof gearSchema>;
