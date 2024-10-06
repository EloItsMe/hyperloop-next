import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;
