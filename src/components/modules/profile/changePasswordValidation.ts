import { z } from "zod";

export const changePasswordValidationSchema = z.object({
  oldPassword: z
    .string({ required_error: "Old Password is required" })
    .min(8, "Old Password must be at least 8 characters"),
  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(8, "New Password must be at least 8 characters"),
  passwordConfirm: z
    .string({ required_error: "Password Confirmation is required" })
    .min(1),
});
