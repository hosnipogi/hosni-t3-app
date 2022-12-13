import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  name: z.string().min(4),
});

export type Login = z.infer<typeof loginSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
