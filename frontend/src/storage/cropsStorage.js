// In-memory storage for crops/farms data
let crops = [
  {
    id: 1,
    farmName: "Sunset Valley Farm",
    location: "California, USA",
    cropType: "Wheat",
    sowingDate: "2024-03-15",
    weatherTemperature: "22°C",
    nutrientHealth: "Good",
    marketTrend: "Rising",
    improvement: "Consider organic fertilizers for better yield"
  },
  {
    id: 2,
    farmName: "Green Meadows",
    location: "Texas, USA",
    cropType: "Corn",
    sowingDate: "2024-03-10",
    weatherTemperature: "25°C",
    nutrientHealth: "Excellent",
    marketTrend: "Stable",
    improvement: "Current practices are optimal"
  }
];

// Get all crops
export const getAllCrops = () => {
  return [...crops];
};

// Get crop by ID
export const getCropById = (id) => {
  return crops.find(crop => crop.id === parseInt(id));
};

// Add new crop with simulated backend API response
export const addNewCrop = (newCrop) => {
  // Simulate backend API response with dummy data
  const cropWithBackendData = {
    ...newCrop,
    id: Date.now(),
    weatherTemperature: `${Math.floor(Math.random() * 15) + 15}°C`,
    nutrientHealth: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)],
    marketTrend: ['Rising', 'Stable', 'Declining'][Math.floor(Math.random() * 3)],
    improvement: [
      'Consider organic fertilizers for better yield',
      'Current practices are optimal',
      'Increase irrigation frequency',
      'Apply pest control measures',
      'Soil testing recommended'
    ][Math.floor(Math.random() * 5)]
  };
  
  crops.push(cropWithBackendData);
  return cropWithBackendData;
};

// Update existing crop
export const updateCrop = (id, updatedData) => {
  const index = crops.findIndex(crop => crop.id === parseInt(id));
  if (index !== -1) {
    crops[index] = { ...crops[index], ...updatedData };
    return crops[index];
  }
  return null;
};

// Delete crop
export const deleteCrop = (id) => {
  const index = crops.findIndex(crop => crop.id === parseInt(id));
  if (index !== -1) {
    const deletedCrop = crops.splice(index, 1)[0];
    return deletedCrop;
  }
  return null;
};

// Get crops by farm name
export const getCropsByFarmName = (farmName) => {
  return crops.filter(crop => crop.farmName === farmName);
};

// Get unique farm names
export const getUniqueFarmNames = () => {
  return [...new Set(crops.map(crop => crop.farmName))];
};

// Get crops count
export const getCropsCount = () => {
  return crops.length;
};

// Get crops with specific health status
export const getCropsByHealth = (healthStatus) => {
  return crops.filter(crop => crop.nutrientHealth === healthStatus);
};

// Search crops
export const searchCrops = (query) => {
  const lowerQuery = query.toLowerCase();
  return crops.filter(crop => 
    crop.farmName.toLowerCase().includes(lowerQuery) ||
    crop.location.toLowerCase().includes(lowerQuery) ||
    crop.cropType.toLowerCase().includes(lowerQuery)
  );
};
