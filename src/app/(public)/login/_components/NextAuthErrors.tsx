"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function NextAuthErrors({ error }: { error?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      setTimeout(() => {
        toast.error("Something went wrong");
        router.push("/login");
      });
    }
  }, [error, router]);

  return null;
}
