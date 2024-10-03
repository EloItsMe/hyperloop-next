"use client";

import { GithubIcon } from "@/assets/icons/GithubIcon";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { loginWithGithubAction } from "../action";

export function LoginWithGithub() {
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
      Login with Github
    </Button>
  );
}
