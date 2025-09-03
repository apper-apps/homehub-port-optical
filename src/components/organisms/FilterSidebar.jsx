import React from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import PriceRange from "@/components/molecules/PriceRange";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen = false, 
  onClose,
  className 
}) => {
  const propertyTypes = [
    { value: "", label: "All Types" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "townhome", label: "Townhome" },
    { value: "apartment", label: "Apartment" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ];

  const bathroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== "" && value !== null && value !== undefined
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white rounded-xl shadow-lg h-fit sticky top-24",
        "lg:block lg:relative lg:transform-none lg:shadow-lg",
        "fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        className
      )}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-display font-semibold text-lg text-primary">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <h2 className="font-display font-semibold text-lg text-primary">Filter Properties</h2>
            {hasActiveFilters && (
              <Button
                onClick={onClearFilters}
                variant="ghost"
                size="small"
                className="text-accent hover:text-accent/80"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Price Range */}
          <PriceRange
            minPrice={filters.priceMin}
            maxPrice={filters.priceMax}
            onMinPriceChange={(value) => updateFilter("priceMin", value)}
            onMaxPriceChange={(value) => updateFilter("priceMax", value)}
          />

          {/* Property Type */}
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Property Type</h4>
            <Select
value={filters.property_type_c || ""}
              onChange={(e) => updateFilter("propertyType", e.target.value)}
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Bedrooms</h4>
            <Select
              value={filters.bedroomsMin || ""}
              onChange={(e) => updateFilter("bedroomsMin", e.target.value ? parseInt(e.target.value) : null)}
            >
              {bedroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Bathrooms</h4>
            <Select
              value={filters.bathroomsMin || ""}
              onChange={(e) => updateFilter("bathroomsMin", e.target.value ? parseInt(e.target.value) : null)}
            >
              {bathroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden space-y-3 pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="primary"
              size="large"
              className="w-full"
            >
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button
                onClick={() => {
                  onClearFilters();
                  onClose();
                }}
                variant="outline"
                size="large"
                className="w-full"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;