import { z } from "zod";

export const registrationSchema = z.object({
  oldPassword: z
    .string({ required_error: "old Password is required" })
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string({ required_error: "new Password is required" })
    .min(8, "Password must be at least 8 characters"),
  passwordConfirm: z
    .string({ required_error: "Password Confirmation is required" })
    .min(1),
});
