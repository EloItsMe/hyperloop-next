"use client";

import { Button, ButtonProps } from "@/components/ui/Button";
import { useFormStatus } from "react-dom";

export function SubmitButton(
  props: Omit<ButtonProps, "isLoading" | "type">
) {
  const { pending } = useFormStatus();

  return <Button type="submit" isLoading={pending} {...props} />;
}
