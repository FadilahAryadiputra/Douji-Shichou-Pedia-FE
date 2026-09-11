import { z } from "zod";
import { userSchema } from "./user.schema";

export const userLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters"),
});

export const userLoginResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    token: z.string(),
    payload: userSchema,
  }),
});

export type UserLoginInput = z.infer<
  typeof userLoginSchema
>;

export type UserLoginResponse = z.infer<
  typeof userLoginResponseSchema
>;