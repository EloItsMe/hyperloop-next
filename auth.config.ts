import { env } from "@/env";
import { capitalize } from "@/lib/utils/string";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
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
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
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
    async createUser({ user }) {
      if (!user.email) {
        return;
      }

      if (!user.image) {
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            image: `https://api.dicebear.com/9.x/initials/png?seed=${user.email}`,
          },
        });
      }

      if (!user.name) {
        const nameArray = user.email.split("@")[0].split(".");
        capitalize(nameArray[0]);
        capitalize(nameArray[1]);

        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            name: nameArray.join(" "),
          },
        });
      }
    },

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
