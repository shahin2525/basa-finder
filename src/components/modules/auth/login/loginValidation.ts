import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email("invalid email address"),
  password: z
    .string({ required_error: "password is required" })
    .min(8, "password must be 8 character"),
});
