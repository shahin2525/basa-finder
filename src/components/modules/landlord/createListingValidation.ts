import { z } from "zod";

export const createListingValidationSchema = z.object({
  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    })
    .min(1, "Location cannot be empty"),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description cannot be empty"),

  multipleImages: z
    .array(
      z
        .string({
          invalid_type_error: "Images must be strings (URLs)",
        })
        .url("Image must be a valid URL")
    )
    .nonempty("At least one image is required"),

  numberOfBedrooms: z
    .number({
      required_error: "Number of bedrooms is required",
      invalid_type_error: "Number of bedrooms must be a number",
    })
    .int("Number of bedrooms must be an integer")
    .min(0, "Number of bedrooms cannot be negative"),

  rentAmount: z
    .number({
      required_error: "Rent amount is required",
      invalid_type_error: "Rent amount must be a number",
    })
    .min(0, "Rent amount cannot be negative"),
});
