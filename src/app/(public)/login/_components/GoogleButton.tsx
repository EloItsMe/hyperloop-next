"use client";

import { loginWithGoogle } from "@/actions/auth";
import { GoogleIcon } from "@/assets/icons/Google";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await loginWithGoogle();
  };

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full"
      isLoading={isLoading}
      leftIcon={<GoogleIcon />}
      onClick={() => handleOnClick()}
    >
      Login with Google
    </Button>
  );
}
