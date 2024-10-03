import { cn } from "@/lib/utils/tailwindcss";

interface ErrorProps {
  message: string;
  className?: string;
}

export function Error(props: ErrorProps) {
  const style = cn(
    "grid grid-cols-[auto_1fr] gap-2 text-sm text-red-500",
    "before:content-['⚠️']",
    props.className
  );

  return <p className={style}>{props.message}</p>;
}
