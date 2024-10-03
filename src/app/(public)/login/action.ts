"use server";

import { signIn } from "@/../auth.config";
import { z } from "zod";

export async function loginWithGithubAction() {
  await signIn("github");
}

export async function loginWithMagicLinkAction(
  prevState: unknown,
  formData: FormData
) {
  const schema = z.object({
    email: z.string().email(),
  });

  const validation = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validation.success) {
    return validation.error.format();
  }

  await signIn("resend", formData);
}
