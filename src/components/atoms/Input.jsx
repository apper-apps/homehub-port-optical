import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent transition-all duration-200",
          error && "border-error focus:ring-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;