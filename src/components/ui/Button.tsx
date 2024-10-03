import SpinnerIcon from "@/assets/icons/SpinnerIcon";
import { cn } from "@/lib/utils/tailwindcss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant,
  leftIcon,
  rightIcon,
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  const style = cn(
    "inline-flex h-9 items-center justify-center gap-3 rounded-md border border-transparent px-4 text-base font-medium transition-colors",
    "disabled:cursor-not-allowed",
    "[&>svg]:size-5 [&>svg]:text-current",
    {
      "bg-slate-900 text-white": variant === "primary",
      "hover:bg-slate-800": variant === "primary",
      "disabled:bg-slate-700": variant === "primary",
    },
    {
      "border-slate-200 bg-slate-100 text-slate-950": variant === "secondary",
    },
    {
      "disabled:cursor-wait": isLoading,
    },
    className
  );

  return (
    <button className={style} disabled={isLoading} {...props}>
      {isLoading && <SpinnerIcon className="animate-spin" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
