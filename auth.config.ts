import { db } from "@/db";
import { env } from "@/env";
import { capitalize } from "@/lib/utils/string";
import { loginCredentialsSchema } from "@/schemas/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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
} satisfies NextAuthConfig;

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
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await loginCredentialsSchema.parseAsync(credentials);

          const user = await db.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user || !user.password) throw new Error("User does not exist");

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) throw new Error("Invalid password");

          return user;
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session }) {
      console.log("callbacks: session");

      if (!session.user) {
        return session;
      }

      const user = await db.user.findUnique({
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
      console.log("events: createUser");

      if (!user.email) {
        return;
      }

      if (!user.image) {
        await db.user.update({
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

        await db.user.update({
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
      console.log("events: linkAccount");

      if (!user.email) {
        return;
      }

      await db.user.update({
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
