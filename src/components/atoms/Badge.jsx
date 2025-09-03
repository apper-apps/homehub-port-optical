import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium",
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error"
  };

  const sizes = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;