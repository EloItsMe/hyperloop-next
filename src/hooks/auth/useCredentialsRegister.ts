import { registerWithCredentials } from "@/actions/auth/registerWithCredentials";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function useCredentialsRegister() {
  const [formState, formAction] = useFormState(registerWithCredentials, {});

  useEffect(() => {
    if (formState.error?.message) {
      toast.error(formState.error.message);
    }
  }, [formState]);

  return {
    formState,
    formAction,
  };
}
