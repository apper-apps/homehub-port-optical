import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SaveButton = ({ isSaved, onSave, className }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSave();
      }}
      className={cn(
        "p-2 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110",
        isSaved 
          ? "bg-accent text-white shadow-lg animate-heart-bounce" 
          : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-accent shadow-md",
        className
      )}
    >
      <ApperIcon 
        name={isSaved ? "Heart" : "Heart"} 
        size={18} 
        className={isSaved ? "fill-current" : ""}
      />
    </button>
  );
};

export default SaveButton;