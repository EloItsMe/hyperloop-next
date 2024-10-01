import { env } from "@/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
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
