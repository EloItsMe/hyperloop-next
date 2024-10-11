import { z } from "zod";

export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
