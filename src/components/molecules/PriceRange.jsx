import React from "react";
import Input from "@/components/atoms/Input";
import { formatPrice } from "@/utils/formatters";

const PriceRange = ({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
  const handleMinChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    onMinPriceChange(value);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    onMaxPriceChange(value);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-primary">Price Range</h4>
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="number"
          placeholder="Min price"
          value={minPrice || ""}
          onChange={handleMinChange}
          className="text-sm"
        />
        <Input
          type="number"
          placeholder="Max price"
          value={maxPrice || ""}
          onChange={handleMaxChange}
          className="text-sm"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{minPrice ? formatPrice(minPrice) : "No min"}</span>
        <span>{maxPrice ? formatPrice(maxPrice) : "No max"}</span>
      </div>
    </div>
  );
};

export default PriceRange;