import { cn } from "@/lib/utils/tailwindcss";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const style = cn(
    "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-base text-slate-950 transition-colors",
    "placeholder:text-slate-400",
    "focus-visible:border-slate-500 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className
  );

  return <input className={style} {...props} />;
}
