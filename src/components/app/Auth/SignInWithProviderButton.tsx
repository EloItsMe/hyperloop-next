"use client";

import { signIn } from "next-auth/react";

interface SignInWithProviderButtonProps {
  provider: "github";
}

export function SignInWithProviderButton(props: SignInWithProviderButtonProps) {
  return (
    <button onClick={() => signIn(props.provider)}>
      Sign in with {props.provider}
    </button>
  );
}
