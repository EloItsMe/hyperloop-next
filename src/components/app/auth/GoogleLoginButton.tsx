"use client";

import { GoogleIcon } from "@/assets/icons/Google";
import { Button } from "@/components/ui/Button";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";

export function GoogleLoginButton() {
  const { isLoading, login } = useGoogleLogin();

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full"
      isLoading={isLoading}
      leftIcon={<GoogleIcon />}
      onClick={login}
    >
      Continue with Github
    </Button>
  );
}
