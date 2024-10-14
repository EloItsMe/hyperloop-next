"use client";

import { InputField } from "@/components/ui/Form/InputField";
import { PasswordField } from "@/components/ui/Form/PasswordField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useCredentials } from "@/hooks/credentials";

export function CredentialForm() {
  const { registerState, registerAction } = useCredentials();

  return (
    <form action={registerAction} noValidate className="space-y-6">
      <div className="space-y-3">
        <InputField
          type="email"
          label="Email"
          name="email"
          error={registerState?.error?.fieldErrors?.email?.[0]}
        />
        <PasswordField
          label="Password"
          name="password"
          hint=""
          error={registerState?.error?.fieldErrors?.password?.[0]}
        />
      </div>

      <SubmitButton variant="primary" className="w-full">
        Register
      </SubmitButton>
    </form>
  );
}
