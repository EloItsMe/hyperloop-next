import { loginWithGoogle } from "@/actions/auth/loginWithGoogle";
import { useState } from "react";

export function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    await loginWithGoogle();
  };

  return {
    isLoading,
    login,
  };
}
