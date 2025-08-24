# 🌤️ Weather System Documentation

## Overview
This weather system provides comprehensive weather data using the OpenWeather API, including current conditions, 5-day forecasts, historical data, and agricultural insights. All data is stored in JSON format variables for easy access and integration.

## Features

### 🌡️ Current Weather
- Real-time temperature, humidity, pressure
- Wind speed and direction
- Weather conditions and visibility
- Sunrise/sunset times
- Feels-like temperature

### 📅 5-Day Forecast
- Daily temperature (min/max/average)
- Precipitation predictions
- Humidity and wind forecasts
- Weather condition summaries

### 📊 Historical Data
- Last 5 days of weather data
- Temperature patterns and trends
- Humidity and wind historical data
- Weather condition history

### ⚠️ Weather Alerts
- Temperature alerts (extreme heat/cold)
- Wind alerts (strong winds)
- Precipitation alerts (heavy rainfall)

### 🌾 Agricultural Insights
- Irrigation recommendations based on humidity
- Crop health insights from temperature data
- Weather pattern analysis for farming decisions

## Setup

### 1. API Key Configuration
Add your OpenWeather API key to your environment variables:
```bash
# .env file
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 2. Get OpenWeather API Key
1. Visit [OpenWeather](https://openweathermap.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. The free tier includes:
   - Current weather
   - 5-day forecast
   - Historical data (last 5 days)

## Usage

### Basic Usage
```javascript
import weatherAPI from './weather';

// Get all weather data for a location
const weatherData = await weatherAPI.getAllWeatherData(latitude, longitude);

// Get specific data types
const current = await weatherAPI.getCurrentWeather(lat, lon);
const forecast = await weatherAPI.getWeatherForecast(lat, lon);
const historical = await weatherAPI.getHistoricalWeather(lat, lon);
```

### Data Access Functions
```javascript
import { 
  getCurrentWeather, 
  getForecastData, 
  getHistoricalData, 
  getWeatherSummary 
} from './weather';

// Access stored data
const current = getCurrentWeather();
const forecast = getForecastData();
const historical = getHistoricalData();
const summary = getWeatherSummary();
```

## Data Structure

### Current Weather JSON
```json
{
  "timestamp": "2025-01-20T10:30:00.000Z",
  "location": {
    "city": "New Delhi",
    "country": "IN",
    "coordinates": {
      "lat": 28.6139,
      "lon": 77.2090
    }
  },
  "current": {
    "temperature": {
      "current": 25,
      "feels_like": 27,
      "min": 20,
      "max": 30
    },
    "humidity": 65,
    "pressure": 1013,
    "visibility": 10,
    "wind": {
      "speed": 12,
      "direction": 180,
      "gust": null
    },
    "weather": {
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    },
    "clouds": 40,
    "sunrise": "7:00:00 AM",
    "sunset": "5:30:00 PM"
  }
}
```

### Forecast JSON
```json
{
  "location": "New Delhi",
  "country": "IN",
  "forecast_days": 5,
  "daily_forecasts": [
    {
      "date": "Mon Jan 20 2025",
      "temperature": {
        "average": 25,
        "min": 20,
        "max": 30
      },
      "humidity": 65,
      "wind_speed": 12,
      "weather_condition": "Clouds",
      "precipitation": 0
    }
  ]
}
```

### Historical JSON
```json
{
  "date": "Sun Jan 19 2025",
  "days_ago": 1,
  "temperature": {
    "average": 24,
    "min": 19,
    "max": 29
  },
  "humidity": 70,
  "wind_speed": 15,
  "weather_condition": "Clear",
  "precipitation": 0
}
```

### Weather Summary JSON
```json
{
  "summary_timestamp": "2025-01-20T10:30:00.000Z",
  "location": { /* location data */ },
  "current_conditions": { /* current weather */ },
  "forecast_summary": {
    "next_5_days": [ /* forecast array */ ],
    "temperature_trend": {
      "trend": "increasing",
      "variation_degrees": 8,
      "stability": "moderate"
    },
    "precipitation_outlook": {
      "rainy_days": 2,
      "total_precipitation_mm": 15.5,
      "outlook": "moderate"
    }
  },
  "historical_summary": {
    "last_5_days": [ /* historical array */ ],
    "temperature_pattern": {
      "temperature_consistency": 6,
      "humidity_trend": "decreasing"
    }
  },
  "weather_alerts": [
    {
      "type": "temperature",
      "severity": "medium",
      "message": "High temperature alert: Monitor water needs"
    }
  ],
  "agricultural_insights": [
    {
      "category": "irrigation",
      "priority": "medium",
      "message": "Moderate humidity, consider irrigation scheduling"
    }
  ]
}
```

## Sample Locations

The system includes sample coordinates for major Indian cities:
- **New Delhi**: 28.6139, 77.2090
- **Mumbai**: 19.0760, 72.8777
- **Bangalore**: 12.9716, 77.5946
- **Chennai**: 13.0827, 80.2707
- **Kolkata**: 22.5726, 88.3639

## Error Handling

The system includes comprehensive error handling:
- API request failures
- Invalid coordinates
- Network timeouts
- Data parsing errors

## Performance Features

- **Parallel API Calls**: Uses Promise.all for concurrent data fetching
- **Data Caching**: Stores data in variables for immediate access
- **Fallback Parsing**: Multiple JSON extraction methods
- **Efficient Formatting**: Optimized data structure for performance

## Integration Examples

### With Agricultural System
```javascript
import weatherAPI from './weather';
import { analyzeFarmerData } from '../gen-ai/config';

// Get weather data for agricultural analysis
const weatherData = await weatherAPI.getAllWeatherData(farmerLat, farmerLon);

// Use in farmer analysis
const farmerData = {
  ...otherData,
  weather: weatherData.current_conditions
};

const analysis = await analyzeFarmerData(farmerData);
```

### With React Components
```javascript
import React, { useState, useEffect } from 'react';
import weatherAPI from './weather';

const WeatherWidget = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await weatherAPI.getCurrentWeather(lat, lon);
      setWeather(data);
    };
    fetchWeather();
  }, [lat, lon]);

  return (
    <div>
      {weather && (
        <div>
          <h3>{weather.location.city}</h3>
          <p>{weather.current.temperature.current}°C</p>
        </div>
      )}
    </div>
  );
};
```

## API Rate Limits

OpenWeather free tier limits:
- **Current Weather**: 60 calls/minute
- **Forecast**: 60 calls/minute
- **Historical**: 1000 calls/day

## Troubleshooting

### Common Issues
1. **API Key Error**: Check environment variable setup
2. **CORS Issues**: Ensure proper API endpoint usage
3. **Data Format**: Verify JSON structure matches expected format
4. **Network Errors**: Check internet connection and API status

### Debug Mode
Enable console logging to see:
- API responses
- Data parsing results
- Error details
- Performance metrics

## Support

For issues or questions:
1. Check OpenWeather API documentation
2. Verify API key and permissions
3. Review console error messages
4. Check network requests in browser dev tools
