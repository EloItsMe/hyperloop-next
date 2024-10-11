import { cn } from "@/lib/utils/tailwindcss";
import { Error } from "./Error";
import { Hint } from "./Hint";
import { Label } from "./Label";
import { Password } from "./Password";

interface PasswordFieldProps {
  required?: boolean;
  label?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function PasswordField({
  label,
  hint,
  error,
  required,
  name,
  defaultValue,
  placeholder,
  wrapperClassName,
}: PasswordFieldProps) {
  return (
    <div className={cn("grid gap-1", wrapperClassName)}>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Password
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {hint && <Hint message={hint} />}
      {error && <Error message={error} />}
    </div>
  );
}
