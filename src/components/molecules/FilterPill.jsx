import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterPill = ({ label, onRemove, className }) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary rounded-full text-sm font-medium border border-secondary/20 hover:border-secondary/40 transition-all duration-200",
      className
    )}>
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
      >
        <ApperIcon name="X" size={12} />
      </button>
    </div>
  );
};

export default FilterPill;