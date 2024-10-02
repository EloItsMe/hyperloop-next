"use client";

import { GithubIcon } from "@/assets/icons/GithubIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { loginWithGithubAction, loginWithMagicLinkAction } from "./action";

export function LoginWithGithubClient() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await loginWithGithubAction();
  };

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full"
      isLoading={isLoading}
      leftIcon={<GithubIcon />}
      onClick={() => handleOnClick()}
    >
      Sign in with Github
    </Button>
  );
}

export function LoginWithMagicLinkClient() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await loginWithMagicLinkAction(formData);
    setIsLoading(false);
  };

  return (
    <form action={handleOnSubmit}>
      <label htmlFor="email">Email</label>
      <br />
      <Input type="email" name="email" id="email" />
      <br />
      <Button
        variant="primary"
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Sign in
      </Button>
    </form>
  );
}

// TODO DONT USE THIS
export function HandleNextAuthError() {
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
