import { z } from "zod";

export const updateStoreSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Store name must be at least 3 characters.")
    .max(100, "Store name cannot exceed 100 characters."),

  email: z
    .email("Please enter a valid email address.")
    .trim(),

  address: z
    .string()
    .trim()
    .min(3, "Address must be at least 3 characters.")
    .max(400, "Address cannot exceed 400 characters."),
});

export const getRatingsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("desc"),
});