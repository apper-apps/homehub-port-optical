import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-secondary to-secondary/90 text-white hover:from-secondary/90 hover:to-secondary/80 shadow-lg hover:shadow-xl",
    accent: "bg-gradient-to-r from-accent to-accent/90 text-white hover:from-accent/90 hover:to-accent/80 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
    ghost: "text-primary bg-transparent hover:bg-primary/10"
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm rounded-md",
    medium: "px-6 py-2.5 text-sm rounded-lg",
    large: "px-8 py-3 text-base rounded-lg"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 transform hover:scale-105 focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;