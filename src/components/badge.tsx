import * as React from "react";
import { cn } from "../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}
export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn("cs-badge", `cs-badge--${variant}`, className)}
      {...props}
    />
  );
}
