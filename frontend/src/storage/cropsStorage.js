// In-memory storage for crops/farms data
let crops = [
  {
    id: 1,
    farmName: "Sunset Valley Farm",
    location: "Punjab, India",
    cropType: "Wheat",
    sowingDate: "2024-03-15",
    weatherTemperature: "22°C",
    nutrientHealth: "Good",
    marketTrend: "Rising",
    improvement: "Consider organic fertilizers for better yield",
    growthCycleData: [
      {
        timestamp: "2024-10-01T00:00:00.000Z",
        ndviData: {
          currentValue: 0.2,
          weeklyValues: [0.15, 0.18, 0.2],
          analysis: "Young plants are just starting to grow."
        },
        cropHealth: "Seeds planted, waiting for sprouts to come up.",
        weatherForecast: {
          temperatureCelsius: [16, 15, 14, 15, 17],
          rainfallMm: [2, 0, 5, 3, 1],
          analysis: "Cool weather with some rain supports seed germination."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: ["Soil moisture is good for planting."],
        pastFarmerActivity: {
          lastIrrigation: "2024-09-28",
          lastFertilizer: "None",
          lastPestControl: "None",
          notes: "Soil was prepared well before planting."
        },
        recommendedActions: [
          "Keep soil moist but not too wet.",
          "Watch seedlings as they come up.",
          "Plan first irrigation in 3-4 days if no rain."
        ]
      },
      {
        timestamp: "2024-11-01T00:00:00.000Z",
        ndviData: {
          currentValue: 0.4,
          weeklyValues: [0.35, 0.38, 0.4],
          analysis: "Plants growing healthy with many green leaves."
        },
        cropHealth: "Green shoots visible; tillering starting soon.",
        weatherForecast: {
          temperatureCelsius: [10, 9, 7, 8, 9],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Cold but dry; frost protection may be needed."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: ["Cold nights ahead, protect young plants."],
        pastFarmerActivity: {
          lastIrrigation: "2024-10-30",
          lastFertilizer: "Starter fertilizer applied",
          lastPestControl: "None",
          notes: "Plants responding well to fertilizer."
        },
        recommendedActions: [
          "Watch for frost damage and protect plants.",
          "Water plants as needed during dry spells.",
          "Scout for early pests."
        ]
      },
      {
        timestamp: "2024-12-01T00:00:00.000Z",
        ndviData: {
          currentValue: 0.6,
          weeklyValues: [0.55, 0.58, 0.6],
          analysis: "Plants growing strong and tall."
        },
        cropHealth: "Tillers forming; plants growing well.",
        weatherForecast: {
          temperatureCelsius: [8, 7, 6, 7, 8],
          rainfallMm: [1, 3, 2, 1, 0],
          analysis: "Cool days with some light rain, good for steady growth."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: ["Stable weather expected; no immediate concerns."],
        pastFarmerActivity: {
          lastIrrigation: "2024-11-28",
          lastFertilizer: "Nitrogen fertilizer applied",
          lastPestControl: "First fungicide spray done",
          notes: "Disease under control; plants healthy."
        },
        recommendedActions: [
          "Maintain regular watering schedule.",
          "Monitor for diseases; repeat sprays if needed.",
          "Follow fertilizer schedule."
        ]
      },
      {
        timestamp: "2025-02-01T00:00:00.000Z",
        ndviData: {
          currentValue: 0.7,
          weeklyValues: [0.68, 0.7, 0.72],
          analysis: "Plants very healthy and vigorous."
        },
        cropHealth: "Stem elongation and start of head formation.",
        weatherForecast: {
          temperatureCelsius: [18, 20, 22, 23, 21],
          rainfallMm: [0, 0, 0, 1, 0],
          analysis: "Warm dry weather; water plants to avoid stress."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: ["Dry spell may cause some stress soon."],
        pastFarmerActivity: {
          lastIrrigation: "2025-01-29",
          lastFertilizer: "Micronutrients sprayed recently",
          lastPestControl: "Pest control underway",
          notes: "Some stress noticed; watering increased."
        },
        recommendedActions: [
          "Keep watering regularly despite dry weather.",
          "Apply foliar nutrients if stress continues.",
          "Scout for pests as heads form."
        ]
      },
      {
        timestamp: "2025-03-15T00:00:00.000Z",
        ndviData: {
          currentValue: 0.5,
          weeklyValues: [0.52, 0.5, 0.48],
          analysis: "NDVI dropping as plants prepare to ripen."
        },
        cropHealth: "Grain filling; leaves yellowing.",
        weatherForecast: {
          temperatureCelsius: [20, 22, 23, 22, 21],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Warm and dry helps grain ripening."
        },
        marketPrice: {
          status: "Ready for sale",
          currentPrice: 500,
          expectedRangeNext30Days: [490, 515],
          trendAnalysis: "Prices are stable but slightly lower than previous months due to ample global supply."
        },
        alerts: ["Dry and clear weather ideal for ripening."],
        pastFarmerActivity: {
          lastIrrigation: "2025-03-10",
          lastFertilizer: "Potassium fertilizer applied",
          lastPestControl: "Final pest check done",
          notes: "Crop healthy and maturing well."
        },
        recommendedActions: [
          "Stop or reduce watering to allow grains to dry.",
          "Prepare harvesting equipment.",
          "Keep checking for pests."
        ]
      },
      {
        timestamp: "2025-04-15T00:00:00.000Z",
        ndviData: {
          currentValue: 0.3,
          weeklyValues: [0.35, 0.32, 0.3],
          analysis: "Crop looks mature and ready for harvest."
        },
        cropHealth: "Yellow dry stems; harvest soon.",
        weatherForecast: {
          temperatureCelsius: [19, 18, 20, 20, 21],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Clear dry weather helps easy harvest."
        },
        marketPrice: {
          status: "Ready for sale",
          currentPrice: 510,
          expectedRangeNext30Days: [495, 530],
          trendAnalysis: "Prices expected to rise moderately with increased demand and tightening availability."
        },
        alerts: ["Clear weather perfect for harvest."],
        pastFarmerActivity: {
          lastIrrigation: "2025-04-10",
          lastFertilizer: "None lately",
          lastPestControl: "Field clean; no pests found",
          notes: "Ready for harvest; good crop quality."
        },
        recommendedActions: [
          "Stop watering entirely.",
          "Harvest early morning or late evening.",
          "Store grain in dry, ventilated place."
        ]
      }
    ]
  },
  {
    id: 2,
    farmName: "Green Meadows",
    location: "Pune, India",
    cropType: "Corn",
    sowingDate: "2025-04-10",
    weatherTemperature: "25°C",
    nutrientHealth: "Excellent",
    marketTrend: "Stable",
    improvement: "Current practices are optimal",
    growthCycleData: [
      {
        timestamp: "2025-04-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.15,
          weeklyValues: [0.1, 0.12, 0.15],
          analysis: "Plants just starting to grow."
        },
        cropHealth: "Seeds planted, seedlings emerging.",
        weatherForecast: {
          temperatureCelsius: [14, 16, 15, 17, 18],
          rainfallMm: [5, 3, 0, 0, 2],
          analysis: "Cool to mild temperatures with some rain helping germination."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Soil moisture is good for planting."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2024-09-28",
          lastFertilizer: "None",
          lastPestControl: "None",
          notes: "Soil was prepared well before planting."
        },
        recommendedActions: [
          "Keep soil moist but not too wet.",
          "Watch seedlings as they come up.",
          "Plan first irrigation in 3-4 days if no rain."
        ]
      },
      {
        timestamp: "2025-05-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.35,
          weeklyValues: [0.3, 0.32, 0.35],
          analysis: "Plants growing strong, leaves expanding."
        },
        cropHealth: "Young plants with several leaves.",
        weatherForecast: {
          temperatureCelsius: [18, 20, 22, 23, 21],
          rainfallMm: [0, 0, 0, 0, 1],
          analysis: "Warm and dry; irrigation needed."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Cold nights ahead, protect young plants."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2024-10-30",
          lastFertilizer: "Starter fertilizer applied",
          lastPestControl: "None",
          notes: "Plants responding well to fertilizer."
        },
        recommendedActions: [
          "Watch for frost damage and protect plants.",
          "Water plants as needed during dry spells.",
          "Scout for early pests."
        ]
      },
      {
        timestamp: "2025-06-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.6,
          weeklyValues: [0.58, 0.59, 0.6],
          analysis: "Healthy tall plants with tassels forming."
        },
        cropHealth: "Tassels visible, plants tall.",
        weatherForecast: {
          temperatureCelsius: [27, 29, 31, 32, 30],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Hot and dry; watch for heat stress."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Stable weather expected; no immediate concerns."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2024-11-28",
          lastFertilizer: "Nitrogen fertilizer applied",
          lastPestControl: "First fungicide spray done",
          notes: "Disease under control; plants healthy."
        },
        recommendedActions: [
          "Maintain regular watering schedule.",
          "Monitor for diseases; repeat sprays if needed.",
          "Follow fertilizer schedule."
        ]
      },
      {
        timestamp: "2025-07-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.55,
          weeklyValues: [0.58, 0.57, 0.55],
          analysis: "Slight NDVI drop due to heat stress."
        },
        cropHealth: "Flowering, some heat stress.",
        weatherForecast: {
          temperatureCelsius: [33, 35, 36, 34, 32],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Very hot; water regularly."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Dry spell may cause some stress soon."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-01-29",
          lastFertilizer: "Micronutrients sprayed recently",
          lastPestControl: "Pest control underway",
          notes: "Some stress noticed; watering increased."
        },
        recommendedActions: [
          "Keep watering regularly despite dry weather.",
          "Apply foliar nutrients if stress continues.",
          "Scout for pests as heads form."
        ]
      },
      {
        timestamp: "2025-08-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.4,
          weeklyValues: [0.5, 0.45, 0.4],
          analysis: "Plants maturing, NDVI declining."
        },
        cropHealth: "Grain filling, leaves yellowing.",
        weatherForecast: {
          temperatureCelsius: [25, 24, 23, 22, 21],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Warm and dry; good for grain drying."
        },
        marketPrice: {
          status: "Ready for sale soon",
          currentPrice: 2350,
          expectedRangeNext30Days: [2300, 2400],
          trendAnalysis: "Prices steady, expected slight rise as harvest nears."
        },
        alerts: [
          "Dry and clear weather ideal for ripening."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-03-10",
          lastFertilizer: "Potassium fertilizer applied",
          lastPestControl: "Final pest check done",
          notes: "Crop healthy and maturing well."
        },
        recommendedActions: [
          "Stop or reduce watering to allow grains to dry.",
          "Prepare harvesting equipment.",
          "Keep checking for pests."
        ]
      },
      {
        timestamp: "2025-09-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.3,
          weeklyValues: [0.35, 0.32, 0.3],
          analysis: "Crop ready for harvest."
        },
        cropHealth: "Dry crop, ready for harvest.",
        weatherForecast: {
          temperatureCelsius: [22, 21, 20, 20, 21],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Clear dry weather ideal for harvest."
        },
        marketPrice: {
          status: "Ready for sale",
          currentPrice: 2380,
          expectedRangeNext30Days: [2350, 2450],
          trendAnalysis: "Prices likely stable to slightly rising near harvest."
        },
        alerts: [
          "Clear weather perfect for harvest."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-04-10",
          lastFertilizer: "None lately",
          lastPestControl: "Field clean; no pests found",
          notes: "Ready for harvest; good crop quality."
        },
        recommendedActions: [
          "Stop watering entirely.",
          "Harvest early morning or late evening.",
          "Store grain in dry, ventilated place."
        ]
      }
    ]
  },
  {
    id: 3,
    farmName: "Golden Harvest",
    location: "Kerala, India",
    cropType: "Soybeans",
    sowingDate: "2025-05-15",
    weatherTemperature: "18°C",
    nutrientHealth: "Fair",
    marketTrend: "Rising",
    improvement: "Increase irrigation frequency and soil testing recommended",
    growthCycleData: [
      {
        timestamp: "2025-05-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.18,
          weeklyValues: [0.12, 0.15, 0.18],
          analysis: "Young plants are just starting to emerge."
        },
        cropHealth: "Seeds planted, seedlings beginning to sprout.",
        weatherForecast: {
          temperatureCelsius: [16, 18, 17, 19, 20],
          rainfallMm: [4, 2, 0, 1, 3],
          analysis: "Warm weather with some rain is good for seedlings."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Soil moist, good for seedlings."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-05-18",
          lastFertilizer: "None yet",
          lastPestControl: "None",
          notes: "Seeds are sprouting well."
        },
        recommendedActions: [
          "Keep soil moist.",
          "Watch seedlings carefully.",
          "Plan irrigation schedule."
        ]
      },
      {
        timestamp: "2025-06-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.4,
          weeklyValues: [0.36, 0.38, 0.4],
          analysis: "Plants growing healthy and filling out."
        },
        cropHealth: "Seedlings with several leaves, growing well.",
        weatherForecast: {
          temperatureCelsius: [22, 24, 26, 27, 25],
          rainfallMm: [1, 0, 0, 0, 0],
          analysis: "Warm and dry; keep irrigating regularly."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Dry weather, irrigate adequately."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-06-15",
          lastFertilizer: "Starter fertilizer applied",
          lastPestControl: "Monitored for pests",
          notes: "Good growth noticed."
        },
        recommendedActions: [
          "Irrigate regularly.",
          "Monitor pests and diseases.",
          "Prepare for next fertilizer application."
        ]
      },
      {
        timestamp: "2025-07-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.65,
          weeklyValues: [0.62, 0.63, 0.65],
          analysis: "Strong plant growth with good leaf area."
        },
        cropHealth: "Flowering stage, healthy and vigorous.",
        weatherForecast: {
          temperatureCelsius: [29, 31, 33, 34, 30],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Hot and dry conditions; ensure water supply."
        },
        marketPrice: {
          status: "Not ready for sale",
          currentPrice: null,
          expectedRangeNext30Days: null,
          trendAnalysis: null
        },
        alerts: [
          "Heat stress possible; watch plants closely."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-07-18",
          lastFertilizer: "Micronutrients sprayed",
          lastPestControl: "Regular pest control",
          notes: "Heat stress signs detected."
        },
        recommendedActions: [
          "Increase irrigation due to heat.",
          "Apply foliar nutrients if needed.",
          "Maintain pest control."
        ]
      },
      {
        timestamp: "2025-08-20T00:00:00.000Z",
        ndviData: {
          currentValue: 0.55,
          weeklyValues: [0.58, 0.57, 0.55],
          analysis: "NDVI slightly dropping as plants start maturing."
        },
        cropHealth: "Pods forming and some leaves yellowing.",
        weatherForecast: {
          temperatureCelsius: [24, 23, 22, 21, 20],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Warm and dry weather good for pod filling."
        },
        marketPrice: {
          status: "Ready for sale soon",
          currentPrice: 5500,
          expectedRangeNext30Days: [5400, 5700],
          trendAnalysis: "Prices stable with small increases expected as harvest approaches."
        },
        alerts: [
          "Good weather for pod filling."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-08-15",
          lastFertilizer: "Potassium fertilizer applied",
          lastPestControl: "Pest control ongoing",
          notes: "Pods developing well."
        },
        recommendedActions: [
          "Reduce watering gently.",
          "Prepare harvest equipment.",
          "Continue pest monitoring."
        ]
      },
      {
        timestamp: "2025-09-25T00:00:00.000Z",
        ndviData: {
          currentValue: 0.35,
          weeklyValues: [0.38, 0.35, 0.33],
          analysis: "Crop mature and drying down, ready for harvest."
        },
        cropHealth: "Dry pods ready for harvest.",
        weatherForecast: {
          temperatureCelsius: [20, 19, 18, 18, 19],
          rainfallMm: [0, 0, 0, 0, 0],
          analysis: "Ideal clear and dry days for harvest."
        },
        marketPrice: {
          status: "Ready for sale",
          currentPrice: 5600,
          expectedRangeNext30Days: [5500, 5800],
          trendAnalysis: "Prices rising due to lower supplies and increasing demand."
        },
        alerts: [
          "Clear dry weather ideal for harvest."
        ],
        pastFarmerActivity: {
          lastIrrigation: "2025-09-10",
          lastFertilizer: "None recently",
          lastPestControl: "No pests detected",
          notes: "Ready for harvest."
        },
        recommendedActions: [
          "Stop irrigation.",
          "Harvest in cool parts of day.",
          "Store grain in dry place."
        ]
      }
    ]
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
