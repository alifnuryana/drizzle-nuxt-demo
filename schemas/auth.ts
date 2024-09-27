import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const RegisterSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    passwordConfirmation: z.string({ message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
