import * as React from "react";
import { cn } from "../lib/cn";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive";
}
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", role, ...props }, ref) => (
    <div
      ref={ref}
      role={role ?? (variant === "destructive" ? "alert" : "status")}
      className={cn("cs-alert", `cs-alert--${variant}`, className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y-x/heading-has-content -- The caller supplies the title content.
  <h3 ref={ref} className={cn("cs-alert__title", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";
export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("cs-alert__description", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
export const EmptyState = React.forwardRef<HTMLElement, EmptyStateProps>(
  ({ className, title, description, icon, children, ...props }, ref) => (
    <section ref={ref} className={cn("cs-empty-state", className)} {...props}>
      {icon && (
        <div className="cs-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h2 className="cs-empty-state__title">{title}</h2>
      {description && (
        <p className="cs-empty-state__description">{description}</p>
      )}
      {children}
    </section>
  ),
);
EmptyState.displayName = "EmptyState";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("cs-skeleton", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
