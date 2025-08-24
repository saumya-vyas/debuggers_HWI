# 🌾 Farmer Alert Generator

## Overview
The Farmer Alert Generator is an AI-powered system that creates personalized, farmer-friendly alert messages based on weather conditions and crop information. It uses Google's Gemini AI to generate practical, actionable reminders for farmers.

## 🚀 Features

- **AI-Powered Alerts**: Uses Gemini AI to generate contextual farming alerts
- **Weather Integration**: Fetches real-time weather data from backend API
- **Crop-Specific Advice**: Generates alerts tailored to specific crops and locations
- **Fallback System**: Provides intelligent fallback alerts if AI fails
- **Input Validation**: Ensures data quality and prevents errors
- **Batch Processing**: Generate multiple alerts for different crops/locations

## 📁 Files

- **`farmerAlertGenerator.js`** - Main alert generation system
- **`demo.js`** - Demo and testing functions
- **`README.md`** - This documentation file

## 🔧 Setup

### 1. Environment Variables
Make sure you have your Google Gemini API key set:
```bash
# In your .env file
VITE_GOOGLE_API_KEY=your_gemini_api_key_here
```

### 2. Backend API
Ensure your backend is running on `http://localhost:3000` with the farming endpoints:
- `GET /farming/weather` - Weather data
- `GET /farming/crops` - Available crops
- `GET /farming/locations` - Available locations

### 3. Install Dependencies
```bash
npm install @google/genai
```

## 📖 Usage

### Basic Alert Generation
```javascript
import { generateFarmerAlertMessage } from './farmerAlertGenerator.js';

// Generate a single alert
const alert = await generateFarmerAlertMessage('North India', 'Wheat');

if (alert.success) {
  console.log('Alert:', alert.alert);
  console.log('Weather:', alert.weather);
} else {
  console.error('Error:', alert.error);
}
```

### Multiple Alerts
```javascript
import { generateMultipleAlerts } from './farmerAlertGenerator.js';

const cropLocationPairs = [
  { crop: 'Wheat', location: 'North India' },
  { crop: 'Rice', location: 'South India' },
  { crop: 'Corn', location: 'Central India' }
];

const alerts = await generateMultipleAlerts(cropLocationPairs);
alerts.forEach(alert => {
  if (alert.success) {
    console.log(`${alert.crop} in ${alert.location}: ${alert.alert}`);
  }
});
```

### Weather Summary
```javascript
import { getCurrentWeatherSummary } from './farmerAlertGenerator.js';

const weather = await getCurrentWeatherSummary();
console.log('Current:', weather.current);
console.log('Forecast:', weather.forecast);
```

### Input Validation
```javascript
import { validateInputs } from './farmerAlertGenerator.js';

const validation = validateInputs('Wheat', 'North India');
if (validation.isValid) {
  console.log('Inputs are valid');
} else {
  console.log('Validation errors:', validation.errors);
}
```

## 🎯 API Reference

### `generateFarmerAlertMessage(location, crop)`
Generates a single alert message for a specific crop and location.

**Parameters:**
- `location` (string): Farmer's location
- `crop` (string): Type of crop

**Returns:**
```javascript
{
  success: true,
  alert: "Heavy rain in North India, delay wheat irrigation.",
  location: "North India",
  crop: "Wheat",
  weather: { /* weather data */ },
  timestamp: "2024-01-01T12:00:00.000Z",
  generated_by: "Gemini AI"
}
```

### `generateMultipleAlerts(cropLocationPairs)`
Generates alerts for multiple crop-location combinations.

**Parameters:**
- `cropLocationPairs` (Array): Array of `{crop, location}` objects

**Returns:**
- Array of alert objects (same structure as single alert)

### `fetchWeatherData()`
Fetches current weather data from the backend API.

**Returns:**
```javascript
{
  temperature: "25-32°C",
  rainfall: "Light rain expected",
  humidity: "65-75%",
  wind: "5-10 km/h",
  forecast: [
    { day: "Today", temp: "28°C", condition: "Partly cloudy" },
    // ... more forecast data
  ]
}
```

### `validateInputs(crop, location)`
Validates crop and location inputs.

**Returns:**
```javascript
{
  isValid: true,
  errors: []
}
```

## 🌤️ Weather Data Integration

The system automatically fetches weather data from your backend API and formats it for Gemini AI. Weather information includes:

- **Current Conditions**: Temperature, rainfall, humidity, wind
- **Forecast**: 3-day weather prediction
- **Real-time Updates**: Data is fetched fresh for each alert

## 🤖 AI Prompt Engineering

The Gemini AI is prompted with a specific format to ensure consistent, farmer-friendly output:

```
You are an AI assistant helping farmers.

Task:  
Based on the following farmer details:  
- Location: {location}  
- Crop type: {crop}  
- Weather details: {weather_data}  

Generate a **single reminder or alert message**, clear and farmer-friendly, with at most **20 words**.  
Make it practical and relevant to farming needs (irrigation, fertilizer, pest control, harvest timing, etc.).

Examples:  
- "Heavy rain in Delhi, delay wheat irrigation."  
- "Hot weather in Punjab, water paddy crop today."  
- "Low rainfall in Bihar, maize needs extra irrigation."  

Output only the alert message, nothing else.
```

## 🛡️ Error Handling & Fallbacks

### AI Failure Fallback
If Gemini AI fails, the system generates intelligent fallback alerts based on weather patterns:

```javascript
function generateFallbackAlert(location, crop, weatherData) {
  const temp = weatherData.temperature;
  const rainfall = weatherData.rainfall.toLowerCase();
  
  if (rainfall.includes('rain') || rainfall.includes('heavy')) {
    return `Rain expected in ${location}, delay ${crop} irrigation.`;
  } else if (temp.includes('30') || temp.includes('hot')) {
    return `Hot weather in ${location}, water ${crop} crop today.`;
  } else if (rainfall.includes('low') || rainfall.includes('dry')) {
    return `Low rainfall in ${location}, ${crop} needs extra irrigation.`;
  } else {
    return `Monitor ${crop} in ${location}, weather conditions normal.`;
  }
}
```

### API Failure Fallback
If backend APIs fail, the system uses mock data to ensure continued operation.

## 🧪 Testing & Demo

### Console Testing
Load the demo file in your browser and test in the console:

```javascript
// Run all demos
farmerAlertDemos.runAllDemos();

// Test single alert
farmerAlertDemos.demoSingleAlert();

// Test multiple alerts
farmerAlertDemos.demoMultipleAlerts();

// Test weather summary
farmerAlertDemos.demoWeatherSummary();
```

### Manual Testing
```javascript
import { generateFarmerAlertMessage } from './farmerAlertGenerator.js';

// Test with different crops and locations
const testCases = [
  { crop: 'Wheat', location: 'North India' },
  { crop: 'Rice', location: 'South India' },
  { crop: 'Corn', location: 'Central India' }
];

for (const testCase of testCases) {
  const alert = await generateFarmerAlertMessage(testCase.location, testCase.crop);
  console.log(`${testCase.crop} in ${testCase.location}: ${alert.alert}`);
}
```

## 🔄 Integration Examples

### React Component Integration
```jsx
import React, { useState, useEffect } from 'react';
import { generateFarmerAlertMessage } from './farmerAlertGenerator.js';

const FarmerAlert = ({ crop, location }) => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAlert = async () => {
    setLoading(true);
    try {
      const result = await generateFarmerAlertMessage(location, crop);
      setAlert(result);
    } catch (error) {
      console.error('Alert generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (crop && location) {
      generateAlert();
    }
  }, [crop, location]);

  if (loading) return <div>Generating alert...</div>;
  if (!alert) return <div>No alert available</div>;

  return (
    <div className="farmer-alert">
      <h3>🌾 Farming Alert</h3>
      <p>{alert.alert}</p>
      <small>Location: {alert.location} | Crop: {alert.crop}</small>
    </div>
  );
};
```

### Vue Component Integration
```vue
<template>
  <div class="farmer-alert">
    <h3>🌾 Farming Alert</h3>
    <div v-if="loading">Generating alert...</div>
    <div v-else-if="alert">
      <p>{{ alert.alert }}</p>
      <small>Location: {{ alert.location }} | Crop: {{ alert.crop }}</small>
    </div>
    <div v-else>No alert available</div>
  </div>
</template>

<script>
import { generateFarmerAlertMessage } from './farmerAlertGenerator.js';

export default {
  props: ['crop', 'location'],
  data() {
    return {
      alert: null,
      loading: false
    };
  },
  async mounted() {
    if (this.crop && this.location) {
      await this.generateAlert();
    }
  },
  methods: {
    async generateAlert() {
      this.loading = true;
      try {
        this.alert = await generateFarmerAlertMessage(this.location, this.crop);
      } catch (error) {
        console.error('Alert generation failed:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

## 🚨 Troubleshooting

### Common Issues

1. **API Key Missing**
   - Ensure `VITE_GOOGLE_API_KEY` is set in your environment
   - Check that the API key is valid and has Gemini access

2. **Backend Connection Failed**
   - Verify backend is running on `http://localhost:3000`
   - Check CORS configuration
   - Ensure farming endpoints are accessible

3. **AI Generation Failed**
   - Check console for detailed error messages
   - Verify internet connection
   - Check Gemini API quota/limits

4. **Input Validation Errors**
   - Ensure crop and location are not empty
   - Check input length limits (crop: 50 chars, location: 100 chars)

### Debug Mode
Enable detailed logging by checking the browser console for:
- ✅ Success messages
- ❌ Error messages
- 📝 API requests
- 🤖 AI prompts and responses

## 🔮 Future Enhancements

- **Scheduled Alerts**: Generate alerts at specific times
- **Historical Data**: Track alert effectiveness over time
- **Multi-language Support**: Generate alerts in local languages
- **Push Notifications**: Send alerts via SMS or push notifications
- **Machine Learning**: Improve alert relevance based on farmer feedback

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure backend API is accessible
4. Check Gemini API key and quota

---

**Happy Farming! 🌾** Your AI assistant is here to help you make informed decisions about your crops.
