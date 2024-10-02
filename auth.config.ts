import { env } from "@/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: "donotreply@eloits.me",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/login",
    signOut: "/",
    newUser: "/",
  },
  callbacks: {
    async session({ session }) {
      if (!session.user) {
        return session;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      // @ts-expect-error Auth.js typings are wrong
      session.user = user;

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      if (!user.email) {
        return;
      }

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
});
