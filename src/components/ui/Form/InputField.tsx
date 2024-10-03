import { cn } from "@/lib/utils/tailwindcss";
import { Error } from "./Error";
import { Hint } from "./Hint";
import { Input } from "./Input";
import { Label } from "./Label";

interface InputFieldProps {
  type: "text" | "email";
  required?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function InputField({
  type,
  label,
  hint,
  error,
  required,
  name,
  placeholder,
  wrapperClassName,
}: InputFieldProps) {
  return (
    <div className={cn("grid gap-1", wrapperClassName)}>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Input type={type} name={name} id={name} placeholder={placeholder} />
      {hint && <Hint message={hint} />}
      {error && <Error message={error} />}
    </div>
  );
}
