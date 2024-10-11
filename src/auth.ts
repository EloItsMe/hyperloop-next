import authConfig from "@/auth.config";
import { db } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session }) {
      if (session?.user) {
        const user = await db.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        // @ts-expect-error Auth.js typings are wrong
        session.user = user;
      }

      return session;
    },
  },
  ...authConfig,
});
