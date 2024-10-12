import { createEnv } from "@t3-oss/env-nextjs";
import { z, ZodError } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: true,

  server: {
    DATABASE_URL: z.string().url(),

    AUTH_SECRET: z.string(),

    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),

    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
  },

  client: {},

  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    process.exit(1);
  },
});
