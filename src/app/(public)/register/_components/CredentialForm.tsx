"use client";

import {
  registerWithCredentialFormStateProps,
  registerWithCredentials,
} from "@/actions/auth";
import { InputField } from "@/components/ui/Form/InputField";
import { PasswordField } from "@/components/ui/Form/PasswordField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useFormState } from "react-dom";

export function CredentialForm() {
  const [formState, formAction] = useFormState(registerWithCredentials, {
    status: null,
    errors: null,
  } as registerWithCredentialFormStateProps);

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div className="space-y-3">
        <InputField
          type="email"
          label="Email"
          name="email"
          error={formState?.errors?.fieldErrors?.email?.[0]}
        />
        <PasswordField label="Password" name="password" />
        <PasswordField label="Confirm Password" name="confirmPassword" />
      </div>

      <SubmitButton variant="primary" className="w-full">
        Register
      </SubmitButton>
    </form>
  );
}
