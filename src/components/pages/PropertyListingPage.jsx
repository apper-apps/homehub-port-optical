import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import FilterPill from "@/components/molecules/FilterPill";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
import { getFilterPreferences, saveFilterPreferences } from "@/utils/localStorage";
import { formatPrice } from "@/utils/formatters";
import { toast } from "react-toastify";

const PropertyListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    bedroomsMin: null,
    bathroomsMin: null,
    propertyType: "",
    location: ""
  });

  // Initialize filters from URL params or saved preferences
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const savedFilters = getFilterPreferences();
    
    const initialFilters = {
      ...filters,
      location: urlSearch || "",
      ...savedFilters
    };
    
    setFilters(initialFilters);
  }, [searchParams]);

  // Load properties
  useEffect(() => {
    loadProperties();
  }, []);

  // Filter properties when filters or properties change
  useEffect(() => {
    applyFilters();
  }, [properties, filters]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Location/Search filter
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(searchTerm) ||
        property.title.toLowerCase().includes(searchTerm) ||
        property.propertyType.toLowerCase().includes(searchTerm)
      );
    }

    // Price filter
    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= filters.priceMin);
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= filters.priceMax);
    }

    // Bedroom filter
    if (filters.bedroomsMin) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedroomsMin);
    }

    // Bathroom filter
    if (filters.bathroomsMin) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathroomsMin);
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    saveFilterPreferences(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceMin: null,
      priceMax: null,
      bedroomsMin: null,
      bathroomsMin: null,
      propertyType: "",
      location: ""
    };
    setFilters(clearedFilters);
    setSearchParams({});
    saveFilterPreferences(clearedFilters);
    toast.info("Filters cleared");
  };

  const removeFilter = (filterKey) => {
    const newFilters = { ...filters };
    newFilters[filterKey] = filterKey.includes("Min") ? null : "";
    setFilters(newFilters);
    saveFilterPreferences(newFilters);
  };

  const getActiveFilterPills = () => {
    const pills = [];

    if (filters.location) {
      pills.push({
        key: "location",
        label: `Location: ${filters.location}`
      });
    }
    if (filters.priceMin || filters.priceMax) {
      const min = filters.priceMin ? formatPrice(filters.priceMin) : "Any";
      const max = filters.priceMax ? formatPrice(filters.priceMax) : "Any";
      pills.push({
        key: "price",
        label: `Price: ${min} - ${max}`
      });
    }
    if (filters.propertyType) {
      pills.push({
        key: "propertyType",
        label: `Type: ${filters.propertyType}`
      });
    }
    if (filters.bedroomsMin) {
      pills.push({
        key: "bedroomsMin",
        label: `${filters.bedroomsMin}+ bedrooms`
      });
    }
    if (filters.bathroomsMin) {
      pills.push({
        key: "bathroomsMin",
        label: `${filters.bathroomsMin}+ bathrooms`
      });
    }

    return pills;
  };

  const activeFilterPills = getActiveFilterPills();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary mb-2">
                  Find Your Perfect Home
                </h1>
                <p className="text-gray-600">
                  {filteredProperties.length} properties found
                </p>
              </div>

              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Button
                  onClick={() => setIsFilterOpen(true)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="Filter" size={18} />
                  Filters
                  {activeFilterPills.length > 0 && (
                    <span className="bg-accent text-white rounded-full px-2 py-0.5 text-xs font-bold">
                      {activeFilterPills.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterPills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {activeFilterPills.map((pill) => (
                  <FilterPill
                    key={pill.key}
                    label={pill.label}
                    onRemove={() => removeFilter(pill.key)}
                  />
                ))}
                {activeFilterPills.length > 1 && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="small"
                    className="text-accent hover:text-accent/80"
                  >
                    Clear all
                  </Button>
                )}
              </motion.div>
            )}

            {/* Property Grid */}
            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
              error={error}
              onRetry={loadProperties}
              emptyProps={{
                title: filters.location ? `No properties found for "${filters.location}"` : "No properties found",
                description: "Try adjusting your search criteria or browse all available properties.",
                actionText: "Clear Filters",
                onAction: activeFilterPills.length > 0 ? clearFilters : null
              }}
            />
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={clearFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          className="lg:hidden"
        />
      </div>
    </div>
  );
};

export default PropertyListingPage;