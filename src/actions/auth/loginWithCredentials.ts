"use server";

import { signIn } from "@/auth";
import { loginCredentialsSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";

export type loginWithCredentialFormState = {
  error?: {
    message: string;
  };
};

export async function loginWithCredentials(
  prevState: loginWithCredentialFormState,
  formData: FormData
): Promise<loginWithCredentialFormState> {
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

  // Login the user
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: {
              message: "Invalid email or password",
            },
          };
        default:
          return {
            error: {
              message: "Something went wrong",
            },
          };
      }
    }

    throw error;
  }

  return {};
}
