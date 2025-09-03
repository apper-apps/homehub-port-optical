import propertyData from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...propertyData];
  },

  async getById(id) {
    await delay(200);
    const property = propertyData.find(p => p.Id === id);
    return property ? { ...property } : null;
  },

  async create(property) {
    await delay(400);
    const maxId = Math.max(...propertyData.map(p => p.Id));
    const newProperty = {
      ...property,
      Id: maxId + 1
    };
    propertyData.push(newProperty);
    return { ...newProperty };
  },

  async update(id, updatedProperty) {
    await delay(350);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    propertyData[index] = { ...propertyData[index], ...updatedProperty };
    return { ...propertyData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    const deleted = propertyData.splice(index, 1)[0];
    return { ...deleted };
  }
};