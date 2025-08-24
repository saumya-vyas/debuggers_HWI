import { GoogleGenAI } from "@google/genai";

// Use Vite environment variables for API key
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyDmYGrWajSRWnFVYz3QMhC0sd6kQbGQIM4";

if (!apiKey) {
  console.error("Error: VITE_GOOGLE_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey });

// Backend API base URL
const API_BASE = 'http://localhost:3000';

// Gemini prompt for generating farmer alerts
const farmerAlertPrompt = `You are an AI assistant helping farmers.

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

Output only the alert message, nothing else.`;

/**
 * Fetch weather data from the backend API
 * @returns {Promise<Object>} Weather data object
 */
async function fetchWeatherData() {
  try {
    const response = await fetch(`${API_BASE}/farming/weather`);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Weather data fetched:', data);
    return data.data;
  } catch (error) {
    console.error('❌ Error fetching weather data:', error);
    // Return mock weather data as fallback
    return {
      temperature: "25-32°C",
      rainfall: "Light rain expected",
      humidity: "65-75%",
      wind: "5-10 km/h",
      forecast: [
        { day: "Today", temp: "28°C", condition: "Partly cloudy" },
        { day: "Tomorrow", temp: "30°C", condition: "Sunny" },
        { day: "Day 3", temp: "27°C", condition: "Light rain" }
      ]
    };
  }
}

/**
 * Fetch available crops from the backend API
 * @returns {Promise<Array>} Array of available crops
 */
async function fetchCropsData() {
  try {
    const response = await fetch(`${API_BASE}/farming/crops`);
    if (!response.ok) {
      throw new Error(`Crops API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Crops data fetched:', data);
    return data.data;
  } catch (error) {
    console.error('❌ Error fetching crops data:', error);
    // Return mock crops data as fallback
    return [
      'Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton', 'Potatoes', 
      'Tomatoes', 'Onions', 'Carrots', 'Lettuce', 'Spinach', 'Peas'
    ];
  }
}

/**
 * Fetch available locations from the backend API
 * @returns {Promise<Array>} Array of available locations
 */
async function fetchLocationsData() {
  try {
    const response = await fetch(`${API_BASE}/farming/locations`);
    if (!response.ok) {
      throw new Error(`Locations API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Locations data fetched:', data);
    return data.data;
  } catch (error) {
    console.error('❌ Error fetching locations data:', error);
    // Return mock locations data as fallback
    return [
      'North India', 'South India', 'East India', 'West India', 'Central India',
      'Himalayan Region', 'Coastal Areas', 'Desert Region', 'Plateau Region'
    ];
  }
}

/**
 * Generate a farmer alert message using Gemini AI
 * @param {string} location - Farmer's location
 * @param {string} crop - Crop type
 * @param {Object} weatherData - Weather information
 * @returns {Promise<string>} Generated alert message
 */
async function generateFarmerAlert(location, crop, weatherData) {
  try {
    // Format weather data for the prompt
    const weatherSummary = `
      Temperature: ${weatherData.temperature}
      Rainfall: ${weatherData.rainfall}
      Humidity: ${weatherData.humidity}
      Wind: ${weatherData.wind}
      Today's Forecast: ${weatherData.forecast[0]?.condition || 'Unknown'}
    `.trim();

    // Create the prompt with actual data
    const prompt = farmerAlertPrompt
      .replace('{location}', location)
      .replace('{crop}', crop)
      .replace('{weather_data}', weatherSummary);

    console.log('📝 Sending prompt to Gemini:', prompt);

    // Generate content using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const alertMessage = response.text.trim();
    console.log('✅ Gemini alert generated:', alertMessage);
    
    return alertMessage;
  } catch (error) {
    console.error('❌ Error generating alert with Gemini:', error);
    
    // Fallback alert message based on weather conditions
    return generateFallbackAlert(location, crop, weatherData);
  }
}

/**
 * Generate a fallback alert message when Gemini fails
 * @param {string} location - Farmer's location
 * @param {string} crop - Crop type
 * @param {Object} weatherData - Weather information
 * @returns {string} Fallback alert message
 */
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

/**
 * Main function to generate farmer alerts
 * @param {string} location - Farmer's location
 * @param {string} crop - Crop type
 * @returns {Promise<Object>} Object containing alert message and related data
 */
async function generateFarmerAlertMessage(location, crop) {
  try {
    console.log(`🌾 Generating alert for ${crop} in ${location}`);
    
    // Fetch weather data
    const weatherData = await fetchWeatherData();
    
    // Generate alert using Gemini
    const alertMessage = await generateFarmerAlert(location, crop, weatherData);
    
    // Create response object
    const alertData = {
      success: true,
      alert: alertMessage,
      location: location,
      crop: crop,
      weather: weatherData,
      timestamp: new Date().toISOString(),
      generated_by: 'Gemini AI'
    };
    
    console.log('✅ Alert generation completed:', alertData);
    return alertData;
    
  } catch (error) {
    console.error('❌ Error in alert generation process:', error);
    
    return {
      success: false,
      error: error.message,
      location: location,
      crop: crop,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate alerts for multiple crops and locations
 * @param {Array} cropLocationPairs - Array of {crop, location} objects
 * @returns {Promise<Array>} Array of alert messages
 */
async function generateMultipleAlerts(cropLocationPairs) {
  try {
    console.log('🌾 Generating multiple alerts:', cropLocationPairs);
    
    const alerts = [];
    
    for (const pair of cropLocationPairs) {
      const alert = await generateFarmerAlertMessage(pair.location, pair.crop);
      alerts.push(alert);
      
      // Add small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('✅ Multiple alerts generated:', alerts);
    return alerts;
    
  } catch (error) {
    console.error('❌ Error generating multiple alerts:', error);
    return [];
  }
}

/**
 * Get current weather conditions summary
 * @returns {Promise<Object>} Current weather summary
 */
async function getCurrentWeatherSummary() {
  try {
    const weatherData = await fetchWeatherData();
    
    return {
      current: {
        temperature: weatherData.temperature,
        condition: weatherData.forecast[0]?.condition || 'Unknown',
        rainfall: weatherData.rainfall,
        humidity: weatherData.humidity
      },
      forecast: weatherData.forecast.slice(0, 3), // Next 3 days
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error getting weather summary:', error);
    return null;
  }
}

/**
 * Validate crop and location inputs
 * @param {string} crop - Crop type to validate
 * @param {string} location - Location to validate
 * @returns {Object} Validation result
 */
function validateInputs(crop, location) {
  const errors = [];
  
  if (!crop || crop.trim().length === 0) {
    errors.push('Crop type is required');
  }
  
  if (!location || location.trim().length === 0) {
    errors.push('Location is required');
  }
  
  if (crop && crop.trim().length > 50) {
    errors.push('Crop type is too long (max 50 characters)');
  }
  
  if (location && location.trim().length > 100) {
    errors.push('Location is too long (max 100 characters)');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Export all functions
export {
  generateFarmerAlertMessage,
  generateMultipleAlerts,
  fetchWeatherData,
  fetchCropsData,
  fetchLocationsData,
  getCurrentWeatherSummary,
  validateInputs,
  generateFarmerAlert
};

// Default export
export default generateFarmerAlertMessage;
