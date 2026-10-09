import * as React from "react";
import { cn } from "../lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("cs-card", className)} {...props} />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("cs-card__header", className)} {...props} />
));
CardHeader.displayName = "CardHeader";
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y-x/heading-has-content -- The caller supplies the title content.
  <h3 ref={ref} className={cn("cs-card__title", className)} {...props} />
));
CardTitle.displayName = "CardTitle";
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("cs-card__description", className)} {...props} />
));
CardDescription.displayName = "CardDescription";
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("cs-card__content", className)} {...props} />
));
CardContent.displayName = "CardContent";
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("cs-card__footer", className)} {...props} />
));
CardFooter.displayName = "CardFooter";
