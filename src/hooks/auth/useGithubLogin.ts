import { loginWithGithub } from "@/actions/auth/loginWithGithub";
import { useState } from "react";

export function useGithubLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    await loginWithGithub();
  };

  return {
    isLoading,
    login,
  };
}
