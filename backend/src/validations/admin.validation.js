import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(60, "Name cannot exceed 60 characters."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters."),

  role: z.enum([
    "ADMIN",
    "OWNER",
    "USER"
  ])
  
});

export const getUsersSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(10),

  search: z.string().trim().default(""),

  sortBy: z
    .enum([
      "name",
      "email",
      "role",
      "createdAt",
    ])
    .default("createdAt"),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("desc"),
});

export const getUserByIdSchema = z.object({
  id: z.uuid("Invalid user ID."),
});

export const createStoreSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Store name must be at least 3 characters.")
    .max(100, "Store name cannot exceed 100 characters."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters."),

  ownerId: z.uuid("Invalid owner ID."),
});

export const getStoresSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional().default(""),

  sortBy: z
    .enum(["name", "email", "address", "createdAt"])
    .default("createdAt"),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("desc"),
});

export const getStoreByIdSchema = z.object({
  id: z.uuid("Invalid store ID."),
});