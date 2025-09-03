import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageGallery from "@/components/organisms/ImageGallery";
import PropertyStats from "@/components/molecules/PropertyStats";
import SaveButton from "@/components/molecules/SaveButton";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
import { formatPrice, formatAddress } from "@/utils/formatters";
import { isPropertySaved, saveProperty, removeSavedProperty } from "@/utils/localStorage";
import { toast } from "react-toastify";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(parseInt(id));
      if (data) {
        setProperty(data);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      setError("Failed to load property details");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!property) return;
    
    const isSaved = isPropertySaved(property.Id);
    if (isSaved) {
      removeSavedProperty(property.Id);
      toast.info("Property removed from saved list");
    } else {
      saveProperty(property.Id);
      toast.success("Property saved successfully!");
    }
  };

  const handleContact = () => {
    toast.info("Contact feature would connect you with a real estate agent");
  };

  const handleScheduleTour = () => {
    toast.success("Tour scheduling feature would open booking calendar");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="detail" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error 
            message={error || "Property not found"} 
            onRetry={loadProperty}
          />
        </div>
      </div>
    );
  }

  const { street, cityState } = formatAddress(property.address);
  const isSaved = isPropertySaved(property.Id);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 text-primary hover:bg-primary/5"
        >
          <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
          Back to Properties
        </Button>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <ImageGallery images={property.images} title={property.title} />
        </motion.div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="primary">{property.propertyType}</Badge>
                    {property.yearBuilt && new Date().getFullYear() - property.yearBuilt < 5 && (
                      <Badge variant="success">New Construction</Badge>
                    )}
                  </div>
                  <h1 className="font-display text-3xl font-bold text-primary mb-2">
                    {property.title}
                  </h1>
                  <div className="text-lg text-gray-600">
                    <p className="font-medium">{street}</p>
                    <p>{cityState}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <SaveButton
                    isSaved={isSaved}
                    onSave={handleSave}
                    className="w-12 h-12"
                  />
                </div>
              </div>

              {/* Stats */}
              <PropertyStats
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                squareFeet={property.squareFeet}
                className="text-lg mb-8 pb-8 border-b border-gray-200"
              />

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                    Features & Amenities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-gradient-to-r from-secondary/5 to-transparent rounded-lg"
                      >
                        <ApperIcon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-display text-xl font-semibold text-primary mb-6">
                Property Details
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-primary">
{formatPrice(property.price_c)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-semibold text-primary capitalize">
                    {property.property_type_c}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-semibold text-primary">{property.bedrooms_c}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-semibold text-primary">{property.bathrooms_c}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Square Feet</span>
                  <span className="font-semibold text-primary">
                    {property.square_feet_c?.toLocaleString()}
                  </span>
                </div>
                {property.year_built_c && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-semibold text-primary">{property.year_built_c}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleScheduleTour}
                  variant="primary"
                  size="large"
                  className="w-full"
                >
                  <ApperIcon name="Calendar" size={18} className="mr-2" />
                  Schedule Tour
                </Button>
                <Button
                  onClick={handleContact}
                  variant="outline"
                  size="large"
                  className="w-full"
                >
                  <ApperIcon name="Phone" size={18} className="mr-2" />
                  Contact Agent
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;