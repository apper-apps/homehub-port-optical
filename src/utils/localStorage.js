const SAVED_PROPERTIES_KEY = "homehub_saved_properties";
const FILTER_PREFERENCES_KEY = "homehub_filter_preferences";

export const getSavedProperties = () => {
  try {
    const saved = localStorage.getItem(SAVED_PROPERTIES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error getting saved properties:", error);
    return [];
  }
};

export const saveProperty = (propertyId) => {
  try {
    const saved = getSavedProperties();
    const savedProperty = {
      propertyId,
      savedDate: new Date().toISOString()
    };
    
    if (!saved.find(item => item.propertyId === propertyId)) {
      saved.push(savedProperty);
      localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(saved));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving property:", error);
    return false;
  }
};

export const removeSavedProperty = (propertyId) => {
  try {
    const saved = getSavedProperties();
    const filtered = saved.filter(item => item.propertyId !== propertyId);
    localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error removing saved property:", error);
    return false;
  }
};

export const isPropertySaved = (propertyId) => {
  const saved = getSavedProperties();
  return saved.some(item => item.propertyId === propertyId);
};

export const getFilterPreferences = () => {
  try {
    const preferences = localStorage.getItem(FILTER_PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : null;
  } catch (error) {
    console.error("Error getting filter preferences:", error);
    return null;
  }
};

export const saveFilterPreferences = (filters) => {
  try {
    localStorage.setItem(FILTER_PREFERENCES_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error("Error saving filter preferences:", error);
  }
};