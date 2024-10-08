"use server";

import { auth, signIn } from "@/../auth.config";
import { authMagicLinkSchema } from "@/schemas/auth";
import { z, ZodError } from "zod";

interface magicLinkPrevStateProps {
  message: null | "ERROR" | "SUCCESS";
  errors: z.inferFlattenedErrors<typeof authMagicLinkSchema> | null;
  fieldsValues: z.infer<typeof authMagicLinkSchema>;
}

export async function loginWithMagicLink(
  prevState: magicLinkPrevStateProps,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
  };

  try {
    authMagicLinkSchema.parse(data);
  } catch (error) {
    const ZodError = error as ZodError;
    const errorMap = ZodError.flatten();

    return {
      message: "ERROR",
      errors: errorMap,
      fieldsValues: data,
    } as magicLinkPrevStateProps;
  }

  await signIn("resend", formData);
  // This return is not used because of nextAuth, but it's needed to make the TypeScript happy
  return {
    message: "SUCCESS",
    errors: null,
    fieldsValues: data,
  } as magicLinkPrevStateProps;
}

export async function loginWithGithub() {
  await signIn("github");
}

export async function loginWithGoogle() {
  await signIn("google");
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}
