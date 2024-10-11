"use server";

import {
  loginCredentialsSchema,
  registerCredentialsSchema,
} from "@/schemas/auth";
import { z, ZodError } from "zod";

export type loginWithCredentialFormState = {
  error?: {
    message: string;
  };
};

export async function loginWithCredentials(
  prevState: loginWithCredentialFormState,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Zod Validation
  try {
    loginCredentialsSchema.parse(data);
  } catch {
    return {
      error: {
        message: "Invalid email or password",
      },
    };
  }

  return {};
}

export type registerWithCredentialFormState = {
  error?: z.inferFlattenedErrors<typeof registerCredentialsSchema>;
};

export async function registerWithCredentials(
  prevState: registerWithCredentialFormState,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // Zod Validation
  try {
    registerCredentialsSchema.parse(data);
  } catch (error) {
    const zodError = error as ZodError;
    const mapError = zodError.flatten();

    return {
      error: {
        ...mapError,
      },
    };
  }

  return {};
}
