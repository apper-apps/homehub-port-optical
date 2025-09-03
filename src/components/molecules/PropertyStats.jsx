import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { getBedroomText, getBathroomText, formatSquareFeet } from "@/utils/formatters";

const PropertyStats = ({ bedrooms, bathrooms, squareFeet, className = "" }) => {
  return (
    <div className={`flex items-center gap-4 text-sm text-gray-600 ${className}`}>
      <div className="flex items-center gap-1">
        <ApperIcon name="Bed" size={16} className="text-secondary" />
        <span>{getBedroomText(bedrooms)}</span>
      </div>
      <div className="flex items-center gap-1">
        <ApperIcon name="Bath" size={16} className="text-secondary" />
        <span>{getBathroomText(bathrooms)}</span>
      </div>
      <div className="flex items-center gap-1">
        <ApperIcon name="Square" size={16} className="text-secondary" />
        <span>{formatSquareFeet(squareFeet)}</span>
      </div>
    </div>
  );
};

export default PropertyStats;