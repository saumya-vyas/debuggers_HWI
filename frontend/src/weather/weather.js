// OpenWeather API Configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "WEATHER_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Weather data storage variables
let currentWeatherData = null;
let forecastData = null;
let historicalData = null;
let weatherSummary = null;

// Weather API Functions
class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = BASE_URL;
  }

  // Test API connection with detailed logging
  async testAPIConnection() {
    try {
      console.log('🔍 Testing API connection...');
      console.log('📍 API Key:', this.apiKey);
      console.log('🌐 Base URL:', this.baseUrl);
      
      const testUrl = `${this.baseUrl}/weather?lat=28.6139&lon=77.2090&appid=${this.apiKey}&units=metric`;
      console.log('🔗 Test URL:', testUrl);
      
      const response = await fetch(testUrl);
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        
        if (response.status === 401) {
          throw new Error('API key is invalid or expired. Please check your OpenWeather API key.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please wait before making more requests.');
        } else {
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
      }
      
      const data = await response.json();
      console.log('✅ API test successful:', data.name);
      console.log('🌡️ Current temperature:', data.main?.temp, '°C');
      return true;
    } catch (error) {
      console.error('❌ API test failed:', error);
      
      // Check for network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('🌐 Network error - check internet connection');
        return false;
      }
      
      // Check for CORS errors
      if (error.message.includes('CORS')) {
        console.error('🚫 CORS error - API may not allow browser requests');
        return false;
      }
      
      return false;
    }
  }

  // Fallback API test using different approach
  async testAPIConnectionFallback() {
    try {
      console.log('🔄 Trying fallback API test...');
      
      // Try with a different endpoint
      const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.apiKey}&units=metric`;
      console.log('🔗 Fallback URL:', fallbackUrl);
      
      const response = await fetch(fallbackUrl);
      console.log('📡 Fallback response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Fallback test successful:', data.name);
        return true;
      } else {
        const errorText = await response.text();
        console.error('❌ Fallback test failed:', errorText);
        return false;
      }
    } catch (error) {
      console.error('❌ Fallback test error:', error);
      return false;
    }
  }

  // Comprehensive API test
  async testAPIConnectionComprehensive() {
    console.log('🚀 Starting comprehensive API test...');
    
    // Test 1: Direct API call
    const test1 = await this.testAPIConnection();
    if (test1) {
      console.log('✅ Primary test passed');
      return true;
    }
    
    // Test 2: Fallback test
    console.log('🔄 Primary test failed, trying fallback...');
    const test2 = await this.testAPIConnectionFallback();
    if (test2) {
      console.log('✅ Fallback test passed');
      return true;
    }
    
    // Test 3: Check if it's a CORS issue
    console.log('🔄 Both tests failed, checking for CORS issue...');
    try {
      const corsTestUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.apiKey}&units=metric`;
      const response = await fetch(corsTestUrl, { mode: 'cors' });
      console.log('📡 CORS test response:', response.status);
      return response.ok;
    } catch (corsError) {
      console.error('🚫 CORS test failed:', corsError);
      return false;
    }
  }

  // Get current weather for a location
  async getCurrentWeather(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      currentWeatherData = this.formatCurrentWeather(data);
      return currentWeatherData;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      return null;
    }
  }

  // Get 5-day weather forecast
  async getWeatherForecast(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      forecastData = this.formatForecast(data);
      return forecastData;
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      return null;
    }
  }

  // Get historical weather data (last 5 days)
  async getHistoricalWeather(lat, lon) {
    try {
      const historicalDataArray = [];
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Get data for last 5 days (OpenWeather provides historical data for free tier)
      for (let i = 1; i <= 5; i++) {
        const timestamp = currentTime - (i * 24 * 60 * 60);
        const response = await fetch(
          `${this.baseUrl}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${this.apiKey}&units=metric`
        );
        
        if (response.ok) {
          const data = await response.json();
          historicalDataArray.push(this.formatHistoricalData(data, i));
        }
      }
      
      historicalData = historicalDataArray;
      return historicalData;
    } catch (error) {
      console.error("Error fetching historical weather:", error);
      return null;
    }
  }

  // Get comprehensive weather data (current + forecast only - no historical for free tier)
  async getAllWeatherData(lat, lon) {
    try {
      // Only get current and forecast data (historical requires paid subscription)
      const [current, forecast] = await Promise.all([
        this.getCurrentWeather(lat, lon),
        this.getWeatherForecast(lat, lon)
      ]);

      // Create weather summary without historical data
      weatherSummary = this.createWeatherSummary(current, forecast);
      return weatherSummary;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  // Format current weather data
  formatCurrentWeather(data) {
    return {
      timestamp: new Date().toISOString(),
      location: {
        city: data.name,
        country: data.sys.country,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      },
      current: {
        temperature: {
          current: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          min: Math.round(data.main.temp_min),
          max: Math.round(data.main.temp_max)
        },
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        wind: {
          speed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          direction: data.wind.deg,
          gust: data.wind.gust ? Math.round(data.wind.gust * 3.6) : null
        },
        weather: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon
        },
        clouds: data.clouds.all,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
      }
    };
  }

  // Format forecast data
  formatForecast(data) {
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: date,
          temperatures: [],
          humidity: [],
          wind_speeds: [],
          weather_conditions: [],
          precipitation: []
        };
      }
      
      dailyForecasts[date].temperatures.push(Math.round(item.main.temp));
      dailyForecasts[date].humidity.push(item.main.humidity);
      dailyForecasts[date].wind_speeds.push(Math.round(item.wind.speed * 3.6));
      dailyForecasts[date].weather_conditions.push(item.weather[0].main);
      
      if (item.rain) {
        dailyForecasts[date].precipitation.push(item.rain['3h'] || 0);
      } else {
        dailyForecasts[date].precipitation.push(0);
      }
    });

    // Calculate daily averages and summaries
    const formattedForecast = Object.values(dailyForecasts).map(day => ({
      date: day.date,
      temperature: {
        average: Math.round(day.temperatures.reduce((a, b) => a + b, 0) / day.temperatures.length),
        min: Math.min(...day.temperatures),
        max: Math.max(...day.temperatures)
      },
      humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
      wind_speed: Math.round(day.wind_speeds.reduce((a, b) => a + b, 0) / day.wind_speeds.length),
      weather_condition: this.getMostFrequent(day.weather_conditions),
      precipitation: Math.round(day.precipitation.reduce((a, b) => a + b, 0) * 100) / 100
    }));

    return {
      location: data.city.name,
      country: data.city.country,
      forecast_days: formattedForecast.length,
      daily_forecasts: formattedForecast
    };
  }

  // Format historical data
  formatHistoricalData(data, daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    return {
      date: date.toDateString(),
      days_ago: daysAgo,
      temperature: {
        average: Math.round(data.current.temp),
        min: Math.round(data.current.temp - 5), // Approximate
        max: Math.round(data.current.temp + 5)  // Approximate
      },
      humidity: data.current.humidity,
      wind_speed: Math.round(data.current.wind_speed * 3.6),
      weather_condition: data.current.weather[0].main,
      precipitation: data.current.rain ? data.current.rain['1h'] || 0 : 0
    };
  }

  // Create comprehensive weather summary (without historical data)
  createWeatherSummary(current, forecast) {
    if (!current || !forecast) return null;

    return {
      summary_timestamp: new Date().toISOString(),
      location: current.location,
      current_conditions: current.current,
      forecast_summary: {
        next_5_days: forecast.daily_forecasts,
        temperature_trend: this.analyzeTemperatureTrend(forecast.daily_forecasts),
        precipitation_outlook: this.analyzePrecipitationOutlook(forecast.daily_forecasts)
      },
      weather_alerts: this.generateWeatherAlerts(current, forecast),
      agricultural_insights: this.generateAgriculturalInsights(current, forecast)
    };
  }

  // Helper function to get most frequent value in array
  getMostFrequent(arr) {
    const counts = {};
    arr.forEach(item => {
      counts[item] = (counts[item] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  // Analyze temperature trend
  analyzeTemperatureTrend(forecast) {
    const temps = forecast.map(day => day.temperature.average);
    const trend = temps[temps.length - 1] > temps[0] ? 'increasing' : 'decreasing';
    const variation = Math.max(...temps) - Math.min(...temps);
    
    return {
      trend: trend,
      variation_degrees: variation,
      stability: variation < 5 ? 'stable' : variation < 10 ? 'moderate' : 'unstable'
    };
  }

  // Analyze precipitation outlook
  analyzePrecipitationOutlook(forecast) {
    const rainyDays = forecast.filter(day => day.precipitation > 0).length;
    const totalPrecipitation = forecast.reduce((sum, day) => sum + day.precipitation, 0);
    
    return {
      rainy_days: rainyDays,
      total_precipitation_mm: Math.round(totalPrecipitation * 100) / 100,
      outlook: rainyDays > 3 ? 'wet' : rainyDays > 1 ? 'moderate' : 'dry'
    };
  }

  // Analyze historical pattern
  analyzeHistoricalPattern(historical) {
    const avgTemps = historical.map(day => day.temperature.average);
    const avgHumidity = historical.map(day => day.humidity);
    
    return {
      temperature_consistency: Math.max(...avgTemps) - Math.min(...avgTemps),
      humidity_trend: avgHumidity[avgHumidity.length - 1] > avgHumidity[0] ? 'increasing' : 'decreasing'
    };
  }

  // Generate weather alerts
  generateWeatherAlerts(current, forecast) {
    const alerts = [];
    
    // Temperature alerts
    if (current.current.temperature.current > 35) {
      alerts.push({
        type: 'temperature',
        severity: 'high',
        message: 'High temperature alert: Extreme heat conditions'
      });
    } else if (current.current.temperature.current < 5) {
      alerts.push({
        type: 'temperature',
        severity: 'medium',
        message: 'Low temperature alert: Cold conditions'
      });
    }
    
    // Wind alerts
    if (current.current.wind.speed > 40) {
      alerts.push({
        type: 'wind',
        severity: 'high',
        message: 'High wind alert: Strong winds expected'
      });
    }
    
    // Precipitation alerts
    const heavyRain = forecast.daily_forecasts.some(day => day.precipitation > 20);
    if (heavyRain) {
      alerts.push({
        type: 'precipitation',
        severity: 'medium',
        message: 'Heavy rainfall expected in the forecast'
      });
    }
    
    return alerts;
  }

  // Generate agricultural insights
  generateAgriculturalInsights(current, forecast) {
    const insights = [];
    
    // Soil moisture insights
    if (current.current.humidity < 40) {
      insights.push({
        category: 'irrigation',
        priority: 'high',
        message: 'Low humidity suggests need for irrigation'
      });
    }
    
    // Temperature insights
    if (current.current.temperature.current > 30) {
      insights.push({
        category: 'crop_health',
        priority: 'medium',
        message: 'High temperatures may stress crops, monitor water needs'
      });
    }
    
    // Weather pattern insights
    const tempTrend = this.analyzeTemperatureTrend(forecast.daily_forecasts);
    if (tempTrend.trend === 'decreasing' && tempTrend.variation_degrees > 8) {
      insights.push({
        category: 'planning',
        priority: 'medium',
        message: 'Significant temperature drop expected, prepare for cold protection'
      });
    }
    
    return insights;
  }
}

// Initialize Weather API
const weatherAPI = new WeatherAPI(API_KEY);

// Export functions and data
export {
  weatherAPI,
  currentWeatherData,
  forecastData,
  historicalData,
  weatherSummary
};

// Export individual data getters
export function getCurrentWeather() {
  return currentWeatherData;
}

export function getForecastData() {
  return forecastData;
}

export function getHistoricalData() {
  return historicalData;
}

export function getWeatherSummary() {
  return weatherSummary;
}

// Export the main API instance
export default weatherAPI;
