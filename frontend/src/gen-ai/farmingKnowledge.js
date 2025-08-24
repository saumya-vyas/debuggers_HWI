// Comprehensive Farming Knowledge Base for RAG System
// This file contains structured farming information that can be retrieved based on user queries

export const farmingKnowledgeBase = {
  // Crop-specific knowledge
  crops: {
    'Wheat': {
      name: 'Wheat',
      scientificName: 'Triticum aestivum',
      family: 'Poaceae',
      growthStages: {
        'Germination': {
          duration: '7-10 days',
          description: 'Seed absorbs water and begins to sprout',
          requirements: 'Moist soil, temperature 15-25°C',
          care: 'Keep soil moist but not waterlogged, avoid overwatering',
          commonIssues: 'Damping-off disease, poor seed-soil contact',
          solutions: 'Use treated seeds, ensure proper soil preparation'
        },
        'Vegetative': {
          duration: '60-70 days',
          description: 'Plant develops leaves, stems, and tillers',
          requirements: 'Nitrogen fertilizer, adequate water, sunlight',
          care: 'Apply nitrogen at tillering stage, monitor for pests',
          commonIssues: 'Nitrogen deficiency, pest infestation',
          solutions: 'Apply NPK 20:20:20, use integrated pest management'
        },
        'Flowering': {
          duration: '7-10 days',
          description: 'Plant produces flowers and begins pollination',
          requirements: 'Optimal temperature, no water stress',
          care: 'Avoid irrigation during flowering to prevent disease',
          commonIssues: 'Poor pollination, disease susceptibility',
          solutions: 'Ensure proper spacing, monitor weather conditions'
        },
        'Ripening': {
          duration: '30-40 days',
          description: 'Grains mature and develop',
          requirements: 'Dry conditions, no irrigation',
          care: 'Stop irrigation 2 weeks before harvest',
          commonIssues: 'Pre-harvest sprouting, lodging',
          solutions: 'Monitor weather, harvest at optimal moisture'
        }
      },
      soilRequirements: {
        pH: '6.0-7.5',
        texture: 'Loamy soil',
        drainage: 'Well-drained',
        organicMatter: '2-3%'
      },
      waterRequirements: {
        total: '400-500mm',
        criticalStages: ['Germination', 'Tillering', 'Flowering'],
        irrigationMethod: 'Furrow or sprinkler irrigation'
      },
      pestManagement: {
        commonPests: ['Aphids', 'Armyworms', 'Hessian fly'],
        naturalControl: 'Beneficial insects, crop rotation',
        chemicalControl: 'Use only when necessary, follow label instructions'
      }
    },
    'Rice': {
      name: 'Rice',
      scientificName: 'Oryza sativa',
      family: 'Poaceae',
      growthStages: {
        'Germination': {
          duration: '3-4 days',
          description: 'Seed sprouts in warm water',
          requirements: 'Warm water (25-30°C), oxygen',
          care: 'Maintain water temperature, ensure aeration',
          commonIssues: 'Poor seed quality, cold water',
          solutions: 'Use certified seeds, maintain optimal temperature'
        },
        'Vegetative': {
          duration: '30-50 days',
          description: 'Plant develops tillers and leaves',
          requirements: '2-4 inches water level, nitrogen',
          care: 'Maintain water level, apply nitrogen fertilizer',
          commonIssues: 'Water stress, nutrient deficiency',
          solutions: 'Monitor water level, apply balanced fertilizer'
        },
        'Flowering': {
          duration: '7-10 days',
          description: 'Critical stage for grain formation',
          requirements: 'Optimal water level, no stress',
          care: 'Maintain water level, avoid disturbances',
          commonIssues: 'Poor grain setting, disease',
          solutions: 'Ensure proper water management, monitor health'
        },
        'Ripening': {
          duration: '30-40 days',
          description: 'Grains mature and dry',
          requirements: 'Gradual water reduction',
          care: 'Drain field 7-10 days before harvest',
          commonIssues: 'Delayed maturity, quality issues',
          solutions: 'Proper drainage, harvest at optimal time'
        }
      },
      soilRequirements: {
        pH: '5.5-6.5',
        texture: 'Clay loam',
        drainage: 'Poorly drained (puddled)',
        organicMatter: '2-4%'
      },
      waterRequirements: {
        total: '1000-1500mm',
        criticalStages: ['Transplanting', 'Tillering', 'Flowering'],
        irrigationMethod: 'Flood irrigation'
      }
    },
    'Corn': {
      name: 'Corn',
      scientificName: 'Zea mays',
      family: 'Poaceae',
      growthStages: {
        'Germination': {
          duration: '7-10 days',
          description: 'Seed sprouts and develops roots',
          requirements: 'Warm soil (10-30°C), adequate moisture',
          care: 'Plant 1-2 inches deep, ensure good seed-soil contact',
          commonIssues: 'Cold soil, poor seed placement',
          solutions: 'Wait for soil warming, proper planting depth'
        },
        'Vegetative': {
          duration: '50-70 days',
          description: 'Plant develops leaves and stalks',
          requirements: 'Nitrogen fertilizer, adequate water',
          care: 'Apply nitrogen at V6 and V12 stages',
          commonIssues: 'Nitrogen deficiency, water stress',
          solutions: 'Split nitrogen application, monitor soil moisture'
        },
        'Flowering': {
          duration: '7-10 days',
          description: 'Critical for pollination success',
          requirements: 'Optimal temperature, adequate moisture',
          care: 'Avoid stress during this critical period',
          commonIssues: 'Poor pollination, heat stress',
          solutions: 'Monitor weather, ensure adequate moisture'
        },
        'Ripening': {
          duration: '50-60 days',
          description: 'Kernels develop and mature',
          requirements: 'Gradual moisture reduction',
          care: 'Monitor kernel development, prepare for harvest',
          commonIssues: 'Delayed maturity, quality issues',
          solutions: 'Proper timing, monitor kernel moisture'
        }
      }
    }
  },

  // Weather-based recommendations
  weatherRecommendations: {
    'High Temperature': {
      effects: 'Increased water demand, heat stress, reduced pollination',
      actions: [
        'Increase irrigation frequency',
        'Apply mulch to retain soil moisture',
        'Monitor for heat stress symptoms',
        'Consider shade structures for sensitive crops'
      ]
    },
    'Low Temperature': {
      effects: 'Reduced growth, frost damage, delayed maturity',
      actions: [
        'Protect young plants with covers',
        'Delay planting until soil warms',
        'Use cold-tolerant varieties',
        'Monitor for frost damage'
      ]
    },
    'Heavy Rainfall': {
      effects: 'Waterlogging, nutrient leaching, disease spread',
      actions: [
        'Ensure proper field drainage',
        'Monitor for disease symptoms',
        'Delay fertilizer application',
        'Check for soil erosion'
      ]
    },
    'Drought': {
      effects: 'Water stress, reduced yields, poor quality',
      actions: [
        'Implement water conservation practices',
        'Use drought-tolerant varieties',
        'Apply mulch to retain moisture',
        'Consider irrigation scheduling'
      ]
    }
  },

  // Soil health management
  soilManagement: {
    'pH Management': {
      'Acidic Soil (pH < 6.0)': [
        'Apply agricultural lime',
        'Use acid-tolerant crops',
        'Monitor pH regularly',
        'Consider organic amendments'
      ],
      'Alkaline Soil (pH > 7.5)': [
        'Apply elemental sulfur',
        'Use acidifying fertilizers',
        'Monitor pH changes',
        'Consider crop selection'
      ]
    },
    'Nutrient Management': {
      'Nitrogen Deficiency': [
        'Apply nitrogen fertilizer',
        'Use legume cover crops',
        'Improve organic matter',
        'Monitor plant symptoms'
      ],
      'Phosphorus Deficiency': [
        'Apply phosphorus fertilizer',
        'Use mycorrhizal inoculants',
        'Improve soil structure',
        'Monitor root development'
      ],
      'Potassium Deficiency': [
        'Apply potassium fertilizer',
        'Use potassium-rich amendments',
        'Monitor leaf symptoms',
        'Consider soil testing'
      ]
    }
  },

  // Pest and disease management
  pestManagement: {
    'Natural Control Methods': [
      'Crop rotation',
      'Beneficial insects',
      'Companion planting',
      'Physical barriers',
      'Biological pesticides'
    ],
    'Integrated Pest Management': [
      'Monitor pest populations',
      'Set action thresholds',
      'Use multiple control methods',
      'Evaluate effectiveness',
      'Maintain records'
    ]
  },

  // Harvest timing
  harvestGuidelines: {
    'Wheat': {
      'Optimal Moisture': '13-14%',
      'Visual Indicators': 'Golden brown color, hard kernels',
      'Timing': '2-3 weeks after physiological maturity'
    },
    'Rice': {
      'Optimal Moisture': '20-25%',
      'Visual Indicators': 'Golden yellow panicles, firm kernels',
      'Timing': '30-35 days after flowering'
    },
    'Corn': {
      'Optimal Moisture': '24-26%',
      'Visual Indicators': 'Black layer formation, firm kernels',
      'Timing': 'When kernels are firm and milky'
    }
  }
};

// Function to search knowledge base
export const searchKnowledgeBase = (query, cropType = null) => {
  const queryLower = query.toLowerCase();
  const results = [];

  // Search in crop-specific information
  if (cropType && farmingKnowledgeBase.crops[cropType]) {
    const crop = farmingKnowledgeBase.crops[cropType];
    
    // Search in growth stages
    Object.entries(crop.growthStages).forEach(([stage, info]) => {
      if (queryLower.includes(stage.toLowerCase()) || 
          queryLower.includes('growth') || 
          queryLower.includes('stage')) {
        results.push({
          type: 'Growth Stage',
          crop: cropType,
          stage: stage,
          information: info
        });
      }
    });

    // Search in other crop properties
    if (queryLower.includes('soil') || queryLower.includes('ph')) {
      results.push({
        type: 'Soil Requirements',
        crop: cropType,
        information: crop.soilRequirements
      });
    }

    if (queryLower.includes('water') || queryLower.includes('irrigation')) {
      results.push({
        type: 'Water Requirements',
        crop: cropType,
        information: crop.waterRequirements
      });
    }
  }

  // Search in weather recommendations
  Object.entries(farmingKnowledgeBase.weatherRecommendations).forEach(([condition, info]) => {
    if (queryLower.includes(condition.toLowerCase()) || 
        queryLower.includes('temperature') || 
        queryLower.includes('rain') ||
        queryLower.includes('weather')) {
      results.push({
        type: 'Weather Management',
        condition: condition,
        information: info
      });
    }
  });

  // Search in soil management
  Object.entries(farmingKnowledgeBase.soilManagement).forEach(([category, info]) => {
    if (queryLower.includes(category.toLowerCase()) || 
        queryLower.includes('soil') || 
        queryLower.includes('nutrient')) {
      results.push({
        type: 'Soil Management',
        category: category,
        information: info
      });
    }
  });

  // Search in pest management
  if (queryLower.includes('pest') || 
      queryLower.includes('disease') || 
      queryLower.includes('control')) {
    results.push({
      type: 'Pest Management',
      information: farmingKnowledgeBase.pestManagement
    });
  }

  // Search in harvest guidelines
  if (queryLower.includes('harvest') || 
      queryLower.includes('maturity') || 
      queryLower.includes('timing')) {
    results.push({
      type: 'Harvest Guidelines',
      information: farmingKnowledgeBase.harvestGuidelines
    });
  }

  return results;
};

// Function to get crop-specific advice
export const getCropAdvice = (cropType, growthStage, weatherCondition) => {
  const advice = [];
  
  if (farmingKnowledgeBase.crops[cropType]) {
    const crop = farmingKnowledgeBase.crops[cropType];
    
    if (growthStage && crop.growthStages[growthStage]) {
      const stageInfo = crop.growthStages[growthStage];
      advice.push({
        type: 'Growth Stage Care',
        title: `${growthStage} Care for ${cropType}`,
        description: stageInfo.description,
        requirements: stageInfo.requirements,
        care: stageInfo.care,
        commonIssues: stageInfo.commonIssues,
        solutions: stageInfo.solutions
      });
    }

    if (weatherCondition && farmingKnowledgeBase.weatherRecommendations[weatherCondition]) {
      const weatherInfo = farmingKnowledgeBase.weatherRecommendations[weatherCondition];
      advice.push({
        type: 'Weather Management',
        title: `${weatherCondition} Management`,
        effects: weatherInfo.effects,
        actions: weatherInfo.actions
      });
    }
  }

  return advice;
};

export default farmingKnowledgeBase;
