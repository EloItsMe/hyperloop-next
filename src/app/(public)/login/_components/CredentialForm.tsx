"use client";

import {
  loginWithCredentialFormStateProps,
  loginWithCredentials,
} from "@/actions/auth";
import { InputField } from "@/components/ui/Form/InputField";
import { PasswordField } from "@/components/ui/Form/PasswordField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function CredentialForm() {
  const form = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(loginWithCredentials, {
    status: null,
  } as loginWithCredentialFormStateProps);

  useEffect(() => {
    if (formState?.status === "ERROR") {
      form.current?.reset();
      toast.error("Invalid email or password");
    }
  }, [formState]);

  return (
    <form action={formAction} ref={form} noValidate className="space-y-6">
      <div className="space-y-3">
        <InputField type="email" label="Email" name="email" />
        <PasswordField label="Password" name="password" />
      </div>
      <SubmitButton variant="primary" className="w-full">
        Login
      </SubmitButton>
    </form>
  );
}
