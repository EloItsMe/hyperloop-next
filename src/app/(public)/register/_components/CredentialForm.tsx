"use client";

import {
  registerWithCredentialFormState,
  registerWithCredentials,
} from "@/actions/auth";
import { InputField } from "@/components/ui/Form/InputField";
import { PasswordField } from "@/components/ui/Form/PasswordField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function CredentialForm() {
  const [formState, formAction] = useFormState(
    registerWithCredentials,
    {} as registerWithCredentialFormState
  );

  useEffect(() => {
    console.log(formState);
    if (formState.error?.message) {
      toast.error(formState.error.message);
    }
  }, [formState]);

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
