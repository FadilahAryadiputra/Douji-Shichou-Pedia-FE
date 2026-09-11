import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  email: z.string().email(),
  username: z.string(),
  photoUrl: z.string().nullable(),
});

export type User = z.infer<
  typeof userSchema
>;