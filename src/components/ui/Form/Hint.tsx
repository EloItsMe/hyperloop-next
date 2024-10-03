import { cn } from "@/lib/utils/tailwindcss";

interface HintProps {
  message: string;
  className?: string;
}

export function Hint(props: HintProps) {
  const style = cn("text-sm text-slate-500", props.className);

  return <p className={style}>{props.message}</p>;
}
