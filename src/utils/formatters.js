export const formatPrice = (price) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`;
  }
  return `$${price.toLocaleString()}`;
};

export const formatSquareFeet = (sqft) => {
  return `${sqft.toLocaleString()} sq ft`;
};

export const formatAddress = (address) => {
  const parts = address.split(",");
  if (parts.length >= 2) {
    return {
      street: parts[0].trim(),
      cityState: parts.slice(1).join(",").trim()
    };
  }
  return {
    street: address,
    cityState: ""
  };
};

export const getBedroomText = (bedrooms) => {
  return bedrooms === 1 ? "1 bed" : `${bedrooms} beds`;
};

export const getBathroomText = (bathrooms) => {
  return bathrooms === 1 ? "1 bath" : `${bathrooms} baths`;
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};