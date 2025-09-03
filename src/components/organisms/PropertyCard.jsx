import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyStats from "@/components/molecules/PropertyStats";
import SaveButton from "@/components/molecules/SaveButton";
import Badge from "@/components/atoms/Badge";
import { formatPrice, formatAddress } from "@/utils/formatters";
import { isPropertySaved, saveProperty, removeSavedProperty } from "@/utils/localStorage";
import { toast } from "react-toastify";

const PropertyCard = ({ property, className = "" }) => {
  const isSaved = isPropertySaved(property.Id);
  const { street, cityState } = formatAddress(property.address);

  const handleSave = () => {
    if (isSaved) {
      removeSavedProperty(property.Id);
      toast.info("Property removed from saved list");
    } else {
      saveProperty(property.Id);
      toast.success("Property saved successfully!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group ${className}`}
    >
      <Link to={`/property/${property.Id}`}>
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="primary" className="bg-white/90 backdrop-blur-sm text-primary">
                {property.propertyType}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <SaveButton isSaved={isSaved} onSave={handleSave} />
            </div>
            {property.yearBuilt && new Date().getFullYear() - property.yearBuilt < 5 && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="success" className="bg-success/90 text-white">
                  New Construction
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Price and Type */}
            <div className="flex justify-between items-start mb-3">
              <div className="font-display font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Address */}
            <div className="mb-3">
              <p className="font-medium text-primary leading-snug">{street}</p>
              <p className="text-sm text-gray-600">{cityState}</p>
            </div>

            {/* Stats */}
            <PropertyStats
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              squareFeet={property.squareFeet}
              className="mb-3"
            />

            {/* Features Preview */}
            {property.features && property.features.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {property.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="secondary" size="small">
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 2 && (
                  <Badge variant="secondary" size="small">
                    +{property.features.length - 2} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;