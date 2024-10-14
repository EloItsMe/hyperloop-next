import { loginWithCredentials } from "@/actions/auth/loginWithCredentials";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function useCredentialsLogin() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(loginWithCredentials, {});

  useEffect(() => {
    if (!!formState.error) {
      toast.error(formState.error.message);
      formRef.current?.reset();
    }
  }, [formState]);

  return {
    formRef,
    formState,
    formAction,
  };
}
