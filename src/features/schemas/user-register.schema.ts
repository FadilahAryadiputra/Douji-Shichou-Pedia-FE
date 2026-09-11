import { z } from "zod";

export const userRegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required!")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username maximum length is 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password is required!"),
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Password does not match",
    path: ["confirmPassword"],
  }
);

export type UserRegisterInput = z.infer<
  typeof userRegisterSchema
>;