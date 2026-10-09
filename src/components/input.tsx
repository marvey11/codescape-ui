import * as React from "react";
import { cn } from "../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error = false, "aria-invalid": ariaInvalid, ...props },
    ref,
  ) => (
    <input
      ref={ref}
      className={cn("cs-input", error && "cs-input--error", className)}
      aria-invalid={error || ariaInvalid || undefined}
      {...props}
    />
  ),
);
Input.displayName = "Input";
