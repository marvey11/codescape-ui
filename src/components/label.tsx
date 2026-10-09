import * as React from "react";
import { cn } from "../lib/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y-x/label-has-associated-control -- The caller supplies the label association and children.
    <label ref={ref} className={cn("cs-label", className)} {...props} />
  ),
);
Label.displayName = "Label";
