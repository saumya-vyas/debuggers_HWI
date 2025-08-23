# 🌾 Farmer Portal Storage Modules

This directory contains the in-memory storage system for the Farmer Portal application.

## 📁 File Structure

```
storage/
├── cropsStorage.js      # Manages farm/crop data
├── activitiesStorage.js  # Manages farming activities (7-day limit)
└── index.js            # Exports all storage functions
```

## 🚀 Usage

### Import Storage Functions

```javascript
import { 
  getAllCrops, 
  addNewCrop, 
  getAllActivities, 
  addNewActivity 
} from './storage';
```

## 🌱 Crops Storage (`cropsStorage.js`)

### Functions Available

- **`getAllCrops()`** - Get all crops
- **`getCropById(id)`** - Get crop by ID
- **`addNewCrop(newCrop)`** - Add new crop with simulated backend data
- **`updateCrop(id, updatedData)`** - Update existing crop
- **`deleteCrop(id)`** - Delete crop
- **`getCropsByFarmName(farmName)`** - Get crops by farm name
- **`getUniqueFarmNames()`** - Get unique farm names
- **`getCropsCount()`** - Get total crops count
- **`getCropsByHealth(healthStatus)`** - Get crops by health status
- **`searchCrops(query)`** - Search crops by text

### Data Structure

```javascript
{
  id: 1,
  farmName: "Sunset Valley Farm",
  location: "California, USA",
  cropType: "Wheat",
  sowingDate: "2024-03-15",
  // Backend API response data:
  weatherTemperature: "22°C",
  nutrientHealth: "Good",
  marketTrend: "Rising",
  improvement: "Consider organic fertilizers for better yield"
}
```

## 📅 Activities Storage (`activitiesStorage.js`)

### Functions Available

- **`getAllActivities()`** - Get all activities (7-day limit)
- **`getActivityById(id)`** - Get activity by ID
- **`addNewActivity(newActivity)`** - Add new activity (maintains 7-day limit)
- **`updateActivity(id, updatedData)`** - Update existing activity
- **`deleteActivity(id)`** - Delete activity
- **`getActivitiesByFarmName(farmName)`** - Get activities by farm name
- **`getActivitiesByDateRange(startDate, endDate)`** - Get activities by date range
- **`getActivitiesCount()`** - Get total activities count
- **`getTodayActivities()`** - Get today's activities
- **`getActivitiesByDate(date)`** - Get activities for specific date
- **`getRecentActivities(days)`** - Get recent activities
- **`searchActivities(query)`** - Search activities by text
- **`getActivityStats()`** - Get activity statistics
- **`clearOldActivities()`** - Clear activities older than 7 days

### Data Structure

```javascript
{
  id: 1,
  date: "2024-03-20",
  activity: "Applied fertilizer to wheat field",
  farmName: "Sunset Valley Farm"
}
```

## 🔄 How It Works

### 1. **Crops Storage**
- Stores all farm and crop information
- Simulates backend API responses with dummy data
- Maintains data consistency across the application

### 2. **Activities Storage**
- Maintains a 7-day rolling window of activities
- Automatically removes old activities when adding new ones
- Links activities to farms for data relationships

### 3. **Data Flow**
```
User Input → Storage Function → Update State → Re-render UI
```

## 💡 Example Usage

### Adding a New Crop

```javascript
import { addNewCrop } from './storage';

const newCrop = {
  farmName: "New Farm",
  location: "Oregon, USA",
  cropType: "Potatoes",
  sowingDate: "2024-03-21"
};

const addedCrop = addNewCrop(newCrop);
// Returns crop with generated backend data
```

### Adding a New Activity

```javascript
import { addNewActivity } from './storage';

const newActivity = {
  date: "2024-03-21",
  activity: "Planted potato seeds",
  farmName: "New Farm"
};

const addedActivity = addNewActivity(newActivity);
// Automatically maintains 7-day limit
```

## 🎯 Benefits

- **Separation of Concerns**: Storage logic is separate from UI components
- **Reusability**: Storage functions can be used across different components
- **Maintainability**: Easy to modify storage logic without affecting UI
- **Testing**: Storage functions can be tested independently
- **Scalability**: Easy to extend with new storage features

## 🔮 Future Enhancements

- **Persistence**: Add localStorage or sessionStorage support
- **Real API Integration**: Replace dummy data with actual backend calls
- **Caching**: Implement data caching strategies
- **Validation**: Add data validation and error handling
- **Real-time Updates**: Add WebSocket support for live data updates
