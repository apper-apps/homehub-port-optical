import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
import { getSavedProperties, removeSavedProperty } from "@/utils/localStorage";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all properties and saved property IDs
      const [properties, savedIds] = await Promise.all([
        propertyService.getAll(),
        getSavedProperties()
      ]);
      
      // Filter properties to only include saved ones
      const saved = properties.filter(property => 
        savedIds.some(saved => saved.propertyId === property.Id)
      );
      
      // Sort by save date (most recent first)
      const sortedSaved = saved.sort((a, b) => {
        const aSaveDate = savedIds.find(s => s.propertyId === a.Id)?.savedDate;
        const bSaveDate = savedIds.find(s => s.propertyId === b.Id)?.savedDate;
        return new Date(bSaveDate) - new Date(aSaveDate);
      });
      
      setAllProperties(properties);
      setSavedProperties(sortedSaved);
    } catch (err) {
      setError("Failed to load saved properties");
      toast.error("Failed to load saved properties");
    } finally {
      setLoading(false);
    }
  };

  const clearAllSaved = () => {
    savedProperties.forEach(property => {
      removeSavedProperty(property.Id);
    });
    setSavedProperties([]);
    toast.info("All saved properties cleared");
  };

  const handleViewAllProperties = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-primary mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>

          {savedProperties.length > 0 && (
            <Button
              onClick={clearAllSaved}
              variant="outline"
              className="text-accent border-accent hover:bg-accent hover:text-white"
            >
              <ApperIcon name="Trash2" size={18} className="mr-2" />
              Clear All
            </Button>
          )}
        </motion.div>

        {/* Saved Properties Grid */}
        <PropertyGrid
          properties={savedProperties}
          loading={loading}
          error={error}
          onRetry={loadSavedProperties}
          emptyProps={{
            title: "No saved properties yet",
            description: "Start browsing properties and save your favorites to see them here. Click the heart icon on any property to add it to your saved list.",
            actionText: "Browse Properties",
            onAction: handleViewAllProperties
          }}
        />

        {/* Recently Viewed Section could go here */}
        {savedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Looking for more options?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of properties to find your perfect home.
              </p>
              <Button
                onClick={handleViewAllProperties}
                variant="primary"
                size="large"
              >
                <ApperIcon name="Search" size={18} className="mr-2" />
                Browse All Properties
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SavedPropertiesPage;