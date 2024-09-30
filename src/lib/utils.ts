import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "../../auth.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}
