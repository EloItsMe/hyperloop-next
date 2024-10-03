import { cn } from "@/lib/utils/tailwindcss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, className, ...props }: LabelProps) {
  const style = cn(
    "text-base font-medium text-slate-700",
    {
      "before:pr-1 before:text-red-500 before:content-['*']": required,
    },
    className
  );

  return <label className={style} {...props} />;
}
