"use client";

import { InputField } from "@/components/ui/Form/InputField";
import { PasswordField } from "@/components/ui/Form/PasswordField";
import { SubmitButton } from "@/components/ui/Form/SubmitButton";
import { useCredentialsLogin } from "@/hooks/auth/useCredentialsLogin";
import Link from "next/link";

export default function CredentialsLoginForm() {
  const { formRef, formAction } = useCredentialsLogin();

  return (
    <form action={formAction} ref={formRef} noValidate className="space-y-6">
      <div className="space-y-3">
        <InputField type="email" label="Email" name="email" />
        <PasswordField
          label="Password"
          name="password"
          hint={
            <Link
              href={"/login"}
              className="transition-colors hover:text-slate-950"
            >
              Forgot your password?
            </Link>
          }
        />
      </div>
      <SubmitButton variant="primary" className="w-full">
        Login
      </SubmitButton>
    </form>
  );
}
