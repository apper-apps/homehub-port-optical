import React from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PropertyGrid = ({ properties, loading, error, onRetry, emptyProps }) => {
  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty
        title={emptyProps?.title || "No properties found"}
        description={emptyProps?.description || "Try adjusting your search criteria or browse all properties."}
        actionText={emptyProps?.actionText || "Clear Filters"}
        onAction={emptyProps?.onAction}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;