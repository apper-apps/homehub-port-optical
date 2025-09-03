import { toast } from "react-toastify";
import React from "react";

const tableName = 'property_c';

export const propertyService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "year_built_c" } }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching properties:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "year_built_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching property:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property");
      }
      return null;
    }
  },

  async create(property) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const propertyData = {
        Name: property.Name || property.title_c,
        Tags: property.Tags || '',
        title_c: property.title_c,
        price_c: parseFloat(property.price_c),
        address_c: property.address_c,
        bedrooms_c: parseInt(property.bedrooms_c),
        bathrooms_c: parseInt(property.bathrooms_c),
        square_feet_c: parseInt(property.square_feet_c),
        property_type_c: property.property_type_c,
        images_c: Array.isArray(property.images_c) ? property.images_c.join('\n') : property.images_c,
        description_c: property.description_c,
        features_c: Array.isArray(property.features_c) ? property.features_c.join('\n') : property.features_c,
        year_built_c: parseInt(property.year_built_c)
      };

      const params = {
        records: [propertyData]
      };

      const response = await apperClient.createRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create property records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Property created successfully!");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating property:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error creating property:", error);
        toast.error("Failed to create property");
      }
      return null;
    }
  },

  async update(id, updatedProperty) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const propertyData = {
        Id: parseInt(id),
        ...(updatedProperty.Name && { Name: updatedProperty.Name }),
        ...(updatedProperty.Tags && { Tags: updatedProperty.Tags }),
        ...(updatedProperty.title_c && { title_c: updatedProperty.title_c }),
        ...(updatedProperty.price_c && { price_c: parseFloat(updatedProperty.price_c) }),
        ...(updatedProperty.address_c && { address_c: updatedProperty.address_c }),
        ...(updatedProperty.bedrooms_c && { bedrooms_c: parseInt(updatedProperty.bedrooms_c) }),
        ...(updatedProperty.bathrooms_c && { bathrooms_c: parseInt(updatedProperty.bathrooms_c) }),
        ...(updatedProperty.square_feet_c && { square_feet_c: parseInt(updatedProperty.square_feet_c) }),
        ...(updatedProperty.property_type_c && { property_type_c: updatedProperty.property_type_c }),
        ...(updatedProperty.images_c && { 
          images_c: Array.isArray(updatedProperty.images_c) ? updatedProperty.images_c.join('\n') : updatedProperty.images_c 
        }),
        ...(updatedProperty.description_c && { description_c: updatedProperty.description_c }),
        ...(updatedProperty.features_c && { 
          features_c: Array.isArray(updatedProperty.features_c) ? updatedProperty.features_c.join('\n') : updatedProperty.features_c 
        }),
        ...(updatedProperty.year_built_c && { year_built_c: parseInt(updatedProperty.year_built_c) })
      };

      const params = {
        records: [propertyData]
      };

      const response = await apperClient.updateRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update property records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Property updated successfully!");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating property:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error updating property:", error);
        toast.error("Failed to update property");
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: Array.isArray(id) ? id : [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete property records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("Property deleted successfully!");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting property:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error deleting property:", error);
        toast.error("Failed to delete property");
      }
      return false;
    }
}
};