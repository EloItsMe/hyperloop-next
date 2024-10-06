import { z } from "zod";

export const authMagicLinkSchema = z.object({
  email: z.string().email(),
});
