import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  description = "Try adjusting your search criteria or browse all properties.",
  actionText = "View All Properties",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Home" size={40} className="text-secondary" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-primary mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{description}</p>
      {onAction && actionText && (
        <Button onClick={onAction} variant="primary" size="large">
          <ApperIcon name="Search" size={18} className="mr-2" />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;