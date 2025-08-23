// In-memory storage for farming activities (7-day limit)
let activities = [
  { 
    id: 1, 
    date: "2024-03-20", 
    activity: "Applied fertilizer to wheat field", 
    farmName: "Sunset Valley Farm" 
  },
  { 
    id: 2, 
    date: "2024-03-19", 
    activity: "Irrigated corn field", 
    farmName: "Green Meadows" 
  },
  { 
    id: 3, 
    date: "2024-03-18", 
    activity: "Pest control measures", 
    farmName: "Sunset Valley Farm" 
  },
  { 
    id: 4, 
    date: "2024-03-17", 
    activity: "Soil testing completed", 
    farmName: "Green Meadows" 
  },
  { 
    id: 5, 
    date: "2024-03-16", 
    activity: "Harvested previous crop", 
    farmName: "Sunset Valley Farm" 
  },
  { 
    id: 6, 
    date: "2024-03-15", 
    activity: "Planted new seeds", 
    farmName: "Green Meadows" 
  },
  { 
    id: 7, 
    date: "2024-03-14", 
    activity: "Field preparation", 
    farmName: "Sunset Valley Farm" 
  }
];

// Get all activities (maintains 7-day limit)
export const getAllActivities = () => {
  return [...activities];
};

// Get activity by ID
export const getActivityById = (id) => {
  return activities.find(activity => activity.id === parseInt(id));
};

// Add new activity (maintains 7-day limit)
export const addNewActivity = (newActivity) => {
  const activityWithId = {
    ...newActivity,
    id: Date.now()
  };
  
  // Add new activity at the beginning
  activities.unshift(activityWithId);
  
  // Keep only the last 7 activities (7-day limit)
  if (activities.length > 7) {
    activities = activities.slice(0, 7);
  }
  
  return activityWithId;
};

// Update existing activity
export const updateActivity = (id, updatedData) => {
  const index = activities.findIndex(activity => activity.id === parseInt(id));
  if (index !== -1) {
    activities[index] = { ...activities[index], ...updatedData };
    return activities[index];
  }
  return null;
};

// Delete activity
export const deleteActivity = (id) => {
  const index = activities.findIndex(activity => activity.id === parseInt(id));
  if (index !== -1) {
    const deletedActivity = activities.splice(index, 1)[0];
    return deletedActivity;
  }
  return null;
};

// Get activities by farm name
export const getActivitiesByFarmName = (farmName) => {
  return activities.filter(activity => activity.farmName === farmName);
};

// Get activities by date range
export const getActivitiesByDateRange = (startDate, endDate) => {
  return activities.filter(activity => {
    const activityDate = new Date(activity.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return activityDate >= start && activityDate <= end;
  });
};

// Get activities count
export const getActivitiesCount = () => {
  return activities.length;
};

// Get activities for today
export const getTodayActivities = () => {
  const today = new Date().toISOString().split('T')[0];
  return activities.filter(activity => activity.date === today);
};

// Get activities for specific date
export const getActivitiesByDate = (date) => {
  return activities.filter(activity => activity.date === date);
};

// Get recent activities (last N days)
export const getRecentActivities = (days) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return activities.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate >= cutoffDate;
  });
};

// Search activities
export const searchActivities = (query) => {
  const lowerQuery = query.toLowerCase();
  return activities.filter(activity => 
    activity.activity.toLowerCase().includes(lowerQuery) ||
    activity.farmName.toLowerCase().includes(lowerQuery)
  );
};

// Get activity statistics
export const getActivityStats = () => {
  const farmActivityCount = {};
  activities.forEach(activity => {
    farmActivityCount[activity.farmName] = (farmActivityCount[activity.farmName] || 0) + 1;
  });
  
  return {
    totalActivities: activities.length,
    farmActivityCount,
    mostActiveFarm: Object.keys(farmActivityCount).reduce((a, b) => 
      farmActivityCount[a] > farmActivityCount[b] ? a : b, null
    )
  };
};

// Clear old activities (older than 7 days)
export const clearOldActivities = () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 7);
  
  activities = activities.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate >= cutoffDate;
  });
  
  return activities.length;
};
