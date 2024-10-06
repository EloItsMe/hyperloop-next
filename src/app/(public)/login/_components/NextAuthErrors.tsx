"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function NextAuthErrors() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has("error")) {
      toast.error("Something went wrong. Please try again.");
      router.push("/login");
    }
  });

  return null;
}
