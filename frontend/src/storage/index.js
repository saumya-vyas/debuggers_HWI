// Export all storage functions
export * from './cropsStorage';
export * from './activitiesStorage';

// Combined storage utilities
export const getStorageStats = async () => {
  const { getAllCrops, getCropsCount, getCropsByHealth } = await import('./cropsStorage');
  const { getAllActivities, getActivitiesCount, getActivityStats } = await import('./activitiesStorage');
  
  const crops = getAllCrops();
  const activities = getAllActivities();
  
  return {
    crops: {
      total: getCropsCount(),
      excellentHealth: getCropsByHealth('Excellent').length,
      goodHealth: getCropsByHealth('Good').length,
      fairHealth: getCropsByHealth('Fair').length,
      poorHealth: getCropsByHealth('Poor').length
    },
    activities: {
      total: getActivitiesCount(),
      ...getActivityStats()
    }
  };
};

// Initialize storage with sample data
export const initializeStorage = () => {
  console.log('🌾 Farmer Portal Storage Initialized');
  console.log('📊 Crops Storage: Ready');
  console.log('📅 Activities Storage: Ready (7-day limit)');
};
