import { z } from "zod";

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters."),

  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters.")
    .max(16, "New password must not exceed 16 characters.")
    .regex(
      /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
      "New password must contain at least one uppercase letter and one special character."
    ),
});

export const getStoresSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  sortBy: z
    .enum([
      "name",
      "email",
      "address",
      "createdAt",
    ])
    .default("createdAt"),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("desc"),
});

export const submitRatingSchema = z.object({
  storeId: z.uuid("Invalid store ID."),

  rating: z
    .number()
    .int("Rating must be an integer.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),
});

export const updateRatingSchema = z.object({
  storeId: z.uuid("Invalid store ID."),

  rating: z
    .number()
    .int("Rating must be an integer.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),
});