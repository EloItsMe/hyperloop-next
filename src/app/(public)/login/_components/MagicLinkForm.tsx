"use client";

import { loginWithMagicLink } from "@/actions/auth";
import { InputField } from "@/components/ui/Form/InputField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export function MagicLinkForm() {
  const form = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(loginWithMagicLink, {
    message: null,
    errors: null,
    fieldsValues: {
      email: "",
    },
  });

  useEffect(() => {
    //   if (formState.message === "SUCCESS") {
    //     form.current?.reset();
    //   }
    // }, [formState.message]);
  });
  return (
    <form action={formAction} ref={form} noValidate className="grid gap-4">
      <InputField
        type="email"
        label="Email"
        name="email"
        // defaultValue={formState.fieldsValues.email}
        // error={formState.errors?.fieldErrors?.email?.[0]}
        error={formState?.errors?.fieldErrors?.email?.[0]}
      />
      <SubmitButton variant="primary" className="w-full">
        Send magic link
      </SubmitButton>
    </form>
  );
}
