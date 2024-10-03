"use client";

import { InputField } from "@/components/ui/Form/InputField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useFormState } from "react-dom";
import { loginWithMagicLinkAction } from "../action";

export function LoginWithMagicLink() {
  const [errors, formAction] = useFormState(loginWithMagicLinkAction, null);

  return (
    <form action={formAction} noValidate className="grid gap-4">
      <InputField
        type="email"
        label="Email"
        name="email"
        error={errors?.email?._errors?.[0]}
      />
      <SubmitButton variant="primary" className="w-full">
        Send magic link
      </SubmitButton>
    </form>
  );
}
