"use server";

import { signIn } from "@/../auth.config";

export async function loginWithGithubAction() {
  await signIn("github");
}

export async function loginWithMagicLinkAction(formData: FormData) {
  await signIn("resend", formData);
}
