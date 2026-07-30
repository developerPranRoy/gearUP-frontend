import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Pick a rating").max(5),
  comment: z.string().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
