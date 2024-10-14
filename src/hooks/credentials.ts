import { loginWithCredentials, registerWithCredentials } from "@/actions/auth";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function useCredentials() {
  const { loginFormRef, loginState, loginAction } = useLogin();
  const { registerState, registerAction } = useRegister();

  return {
    loginFormRef,
    loginState,
    loginAction,
    registerState,
    registerAction,
  };
}

const useLogin = () => {
  const loginFormRef = useRef<HTMLFormElement>(null);
  const [loginState, loginAction] = useFormState(loginWithCredentials, {});

  useEffect(() => {
    if (!!loginState.error) {
      toast.error(loginState.error.message);
      loginFormRef.current?.reset();
    }
  }, [loginState]);

  return {
    loginFormRef,
    loginState,
    loginAction,
  };
};

const useRegister = () => {
  const [registerState, registerAction] = useFormState(
    registerWithCredentials,
    {}
  );

  useEffect(() => {
    if (registerState.error?.message) {
      toast.error(registerState.error.message);
    }
  }, [registerState]);

  return {
    registerState,
    registerAction,
  };
};
