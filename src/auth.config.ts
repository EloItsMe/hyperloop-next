import { env } from "@/env";
import bcrypt from "bcryptjs";
import { NextConfig } from "next";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { loginCredentialsSchema } from "./schemas/auth";

export default {
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = loginCredentialsSchema.parse(credentials);

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });
          if (!user || !user.password) return null;

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) return null;

          return user;
        } catch {
          return null;
        }

        return null;
      },
    }),
  ],
} satisfies NextConfig;
