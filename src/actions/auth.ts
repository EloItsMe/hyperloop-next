"use server";

import { auth, signIn } from "@/auth";
import { db } from "@/db";
import {
  loginCredentialsSchema,
  registerCredentialsSchema,
} from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
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

export type registerWithCredentialFormState = {
  error?: {
    message?: string;
    fieldErrors?: z.inferFlattenedErrors<
      typeof registerCredentialsSchema
    >["fieldErrors"];
  };
};

export async function registerWithCredentials(
  prevState: registerWithCredentialFormState,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Zod Validation
  try {
    registerCredentialsSchema.parse(data);
  } catch (error) {
    const zodError = error as ZodError;
    const mapError = zodError.flatten().fieldErrors;

    return {
      error: {
        fieldErrors: { ...mapError },
      },
    } as registerWithCredentialFormState;
  }

  const { email, password } = registerCredentialsSchema.parse(data);
  // Check if the user already exists
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error("User already exists");
    }
  } catch {
    return {
      error: {
        fieldErrors: {
          email: ["Email address already used"],
        },
      },
    } as registerWithCredentialFormState;
  }

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  try {
    const nameArray = email
      .split("@")[0]
      .split(".")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1));
    const name = nameArray.join(" ");

    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        image: `https://api.dicebear.com/9.x/initials/png?seed=${email}`,
      },
    });
  } catch {
    return {
      error: {
        message: "Something went wrong",
      },
    } as registerWithCredentialFormState;
  }

  // Log in the user
  try {
    await signIn("credentials", {
      email: email,
      password: password,
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

export async function loginWithGithub() {
  await signIn("github");
}

export async function loginWithGoogle() {
  await signIn("google");
}

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}
