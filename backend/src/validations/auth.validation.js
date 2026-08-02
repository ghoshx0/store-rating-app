import { z } from "zod";

export const registerSchema = z.object({
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
    .min(5, "Address must be at least 5 characters.")
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required."),
});

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(20, "Name must be at least 20 characters.")
    .max(60, "Name must not exceed 60 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(16, "Password must not exceed 16 characters.")
    .regex(
      /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain at least one uppercase letter and one special character."
    ),

  address: z
    .string()
    .trim()
    .max(400, "Address must not exceed 400 characters."),
});