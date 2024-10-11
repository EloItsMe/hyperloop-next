"use client";

import { EyeIcon } from "@/assets/icons/Eye";
import { EyeSlashIcon } from "@/assets/icons/EyeSlash";
import { useState } from "react";
import { Input } from "./Input";

export function Password(
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className">
) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center">
      <Input
        type={showPassword ? "text" : "password"}
        className="pl-3 pr-11"
        {...props}
      />
      <button
        type="button"
        className="absolute right-3 size-6 text-slate-950"
        onClick={handleClick}
      >
        <EyeSlashIcon className={showPassword ? "block" : "hidden"} />
        <EyeIcon className={showPassword ? "hidden" : "block"} />
      </button>
    </div>
  );
}
