"use client";

import { InputField } from "@/components/ui/Form/InputField";
import { PasswordField } from "@/components/ui/Form/PasswordField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useCredentialsRegister } from "@/hooks/auth/useCredentialsRegister";

export function CredentialRegisterForm() {
  const { formState, formAction } = useCredentialsRegister();

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div className="space-y-3">
        <InputField
          type="email"
          label="Email"
          name="email"
          error={formState?.error?.fieldErrors?.email?.[0]}
        />
        <PasswordField
          label="Password"
          name="password"
          hint=""
          error={formState?.error?.fieldErrors?.password?.[0]}
        />
      </div>

      <SubmitButton variant="primary" className="w-full">
        Register
      </SubmitButton>
    </form>
  );
}
