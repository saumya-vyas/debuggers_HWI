import { GoogleGenAI } from "@google/genai";

// Use Vite environment variables instead of Node.js process.env
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyDmYGrWajSRWnFVYz3QMhC0sd6kQbGQIM4";

if (!apiKey) {
  console.error("Error: VITE_GOOGLE_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey });

// Agricultural Expert AI System
const agriculturalExpertPrompt = `You are an agricultural expert AI assisting farmers.  

You will be given comprehensive data including:
- Farmer name and basic info
- Crop type and seeding date
- NDVI value (crop health index, range: -1 to +1, where <0.3 = poor, 0.3–0.6 = moderate, >0.6 = healthy)
- Detailed weather forecast (7-day forecast with temperature, rainfall, humidity, wind, sunlight)
- Soil conditions (pH, moisture, nutrients, organic matter)
- Field information (size, irrigation type, crop rotation, pest history)
- Management practices (fertilizer, irrigation, pest control history)

Your task:
1. Calculate the **growth stage** of the crop based on crop type and seeding date (consider crop-specific growth cycles)
2. Analyze the NDVI value to assess crop health and stress levels
3. Evaluate soil conditions and their impact on crop growth
4. Analyze weather patterns and their implications for farming decisions
5. Combine all data to generate **comprehensive, stage-specific advice**
6. Provide specific recommendations for: irrigation scheduling, fertilizer application, pest/disease management, and harvesting timing
7. Consider crop rotation, field history, and management practices in your analysis

Return ONLY a JSON object with the following structure:
{
  "farmer_name": "string",
  "crop_type": "string",
  "seeding_date": "string",
  "days_since_sowing": "number",
  "growth_stage": "string",
  "ndvi_value": "number",
  "crop_health": "string",
  "soil_analysis": "string",
  "weather_impact": "string",
  "critical_alerts": "string",
  "recommendations": ["array of strings"],
  "next_actions": ["array of strings"]
}

Example JSON structure:
{
  "farmer_name": "Ramesh Kumar",
  "crop_type": "wheat",
  "seeding_date": "2025-01-15",
  "days_since_sowing": 5,
  "growth_stage": "Germination to Early Seedling Stage",
  "ndvi_value": 0.38,
  "crop_health": "Moderate Stress - Requires Attention",
  "soil_analysis": "Good pH (6.8), moderate moisture (45%), needs nitrogen boost",
  "weather_impact": "Rain expected in 2 days, good for germination but monitor drainage",
  "critical_alerts": "Low soil moisture may affect germination, consider light irrigation",
  "recommendations": [
    "Your wheat is in critical germination stage with moderate stress due to low soil moisture.",
    "Light irrigation needed today to ensure proper germination before expected rainfall.",
    "Apply starter fertilizer (NPK 20:20:20) after rainfall to boost early growth.",
    "Monitor for damping-off disease due to expected high humidity in coming days.",
    "Prepare for post-rain weed control as moisture will promote weed growth.",
    "Ensure proper field drainage to prevent waterlogging during heavy rainfall."
  ],
  "next_actions": [
    "Immediate: Light irrigation today",
    "Within 2 days: Monitor rainfall and drainage",
    "After rain: Apply starter fertilizer",
    "Weekly: Monitor for pests and diseases"
  ]
}

Now analyze this comprehensive farmer data and return ONLY the JSON object:`;

async function analyzeFarmerData(farmerData) {
  try {
    const prompt = `${agriculturalExpertPrompt}

Farmer Data:
${JSON.stringify(farmerData, null, 2)}

Please provide your analysis in the exact format specified above.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error analyzing farmer data:", error.message);
    return "Error analyzing farmer data";
  }
}

// Store the response in a variable
let response = "";
let jsonData = null; // Store parsed JSON data

// Function to get the stored response
function getResponse() {
  return response;
}

// Function to set the response
function setResponse(newResponse) {
  response = newResponse;
  // Extract JSON data from the response
  jsonData = extractJSONFromResponse(newResponse);
}

// Function to extract JSON data from AI response
function extractJSONFromResponse(aiResponse) {
  try {
    // Since AI now returns only JSON, try to parse the entire response
    const parsed = JSON.parse(aiResponse.trim());
    console.log('✅ Successfully parsed JSON data:', parsed);
    return parsed;
  } catch (error) {
    console.error('❌ Error parsing JSON data:', error.message);
    
    // Fallback: try to find any JSON-like structure in the response
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ Found and parsed JSON data using fallback:', parsed);
        return parsed;
      }
    } catch (fallbackError) {
      console.error('❌ Fallback parsing also failed:', fallbackError.message);
    }
    
    console.log('❌ No valid JSON data found in response');
    return null;
  }
}

// Function to get the extracted JSON data
function getJSONData() {
  return jsonData;
}

// Function to get specific fields from JSON data
function getFarmerName() {
  return jsonData?.farmer_name || 'N/A';
}

function getCropType() {
  return jsonData?.crop_type || 'N/A';
}

function getGrowthStage() {
  return jsonData?.growth_stage || 'N/A';
}

function getCropHealth() {
  return jsonData?.crop_health || 'N/A';
}

function getRecommendations() {
  return jsonData?.recommendations || [];
}

function getNextActions() {
  return jsonData?.next_actions || [];
}

function getCriticalAlerts() {
  return jsonData?.critical_alerts || 'None';
}

console.log('Response variable:', response);
console.log('JSON data:', jsonData);

export { 
  analyzeFarmerData, 
  getResponse, 
  setResponse, 
  getJSONData,
  getFarmerName,
  getCropType,
  getGrowthStage,
  getCropHealth,
  getRecommendations,
  getNextActions,
  getCriticalAlerts
};
export default analyzeFarmerData;