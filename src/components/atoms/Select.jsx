import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  label,
  error,
  children,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          "flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent transition-all duration-200",
          error && "border-error focus:ring-error",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;