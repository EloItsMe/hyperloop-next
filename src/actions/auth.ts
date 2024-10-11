"use server";

import { auth, signIn } from "@/../auth.config";
import { db } from "@/db";
import { registerCredentialsSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";

export type registerWithCredentialFormStateProps = {
  status: null | "ERROR" | "OK";
  errors: null | z.inferFlattenedErrors<typeof registerCredentialsSchema>;
};

export async function registerWithCredentials(
  prevState: registerWithCredentialFormStateProps,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  try {
    const { email: validEmail, password: validPassword } =
      registerCredentialsSchema.parse({
        email,
        password,
        confirmPassword,
      });

    const existingUser = await db.user.findUnique({
      where: {
        email: validEmail,
      },
    });

    if (existingUser) {
      return {
        ...prevState,
        status: "ERROR",
        errors: {
          formErrors: [],
          fieldErrors: {
            email: ["User already exists"],
          },
        },
      } satisfies registerWithCredentialFormStateProps;
    }

    const hashedPassword = await bcrypt.hash(validPassword, 10);

    await db.user.create({
      data: {
        email: validEmail,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: validEmail,
      password: validPassword,
    });

    return {
      ...prevState,
      status: "OK",
      errors: null,
    } satisfies registerWithCredentialFormStateProps;
  } catch (error) {
    const zodError = error as ZodError;
    const errorMap = zodError.flatten();

    return {
      ...prevState,
      status: "ERROR",
      errors: errorMap,
    } satisfies registerWithCredentialFormStateProps;
  }
}

export type loginWithCredentialFormStateProps = {
  status: null | "ERROR" | "OK";
};

export async function loginWithCredentials(
  prevState: loginWithCredentialFormStateProps,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);

    return {
      ...prevState,
      status: "OK",
    } satisfies loginWithCredentialFormStateProps;
  } catch (error) {
    console.log(error);

    return {
      ...prevState,
      status: "ERROR",
    } satisfies loginWithCredentialFormStateProps;
  }
}

export async function loginWithGithub() {
  await signIn("github");
}

export async function loginWithGoogle() {
  await signIn("google");
}

export async function getCurrentUser() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return session.user;
}
