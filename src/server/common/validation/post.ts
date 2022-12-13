import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2),
  categoryId: z.number().optional(),
  id: z.number().optional(),
});

export const postSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3).max(200),
  categories: z.array(categorySchema),
});

export type Post = z.infer<typeof postSchema>;
export type Category = z.infer<typeof categorySchema>;
