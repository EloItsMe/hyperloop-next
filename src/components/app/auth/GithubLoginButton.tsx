"use client";

import { GithubIcon } from "@/assets/icons/Github";
import { Button } from "@/components/ui/Button";
import { useGithubLogin } from "@/hooks/auth/useGithubLogin";

export function GithubLoginButton() {
  const { isLoading, login } = useGithubLogin();

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full"
      isLoading={isLoading}
      leftIcon={<GithubIcon />}
      onClick={login}
    >
      Continue with Github
    </Button>
  );
}
