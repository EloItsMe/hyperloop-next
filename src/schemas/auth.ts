import { z } from "zod";

export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerCredentialsSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((schema) => {
    return (schema.password === schema.confirmPassword);
  }, "Passwords don't match");
