"use client";

import { loginWithGithub } from "@/actions/auth";
import { GithubIcon } from "@/assets/icons/GithubIcon";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function GithubButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await loginWithGithub();
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
      Login with Github
    </Button>
  );
}
