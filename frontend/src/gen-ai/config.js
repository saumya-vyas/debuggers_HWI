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
1. Calculate the growth stage of the crop based on crop type and seeding date (consider crop-specific growth cycles)
2. Analyze the NDVI value to assess crop health and stress levels
3. Evaluate soil conditions and their impact on crop growth
4. Analyze weather patterns and their implications for farming decisions
5. Combine all data to generate comprehensive, stage-specific advice
6. Provide specific recommendations for: irrigation scheduling, fertilizer application, pest/disease management, and harvesting timing
7. Consider crop rotation, field history, and management practices in your analysis

IMPORTANT: Generate responses in clean, professional paragraph format without emojis, symbols, or excessive formatting. Focus on clear, actionable advice that farmers can easily understand and implement.

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
  "next_actions": ["array of strings"],
  "detailed_advice": "string"
}

The "detailed_advice" field should contain a comprehensive, well-structured response in paragraph format that:
- Explains the current crop situation clearly
- Provides actionable recommendations
- Addresses any critical issues
- Gives practical next steps
- Uses simple, farmer-friendly language
- Avoids technical jargon unless necessary
- Focuses on what the farmer needs to do right now

Example detailed_advice format:
"Your wheat crop is currently in the vegetative growth stage, showing moderate stress levels with an NDVI value of 0.38. The crop has been growing for 35 days since sowing and is developing tillers and leaves. Current soil conditions show good pH levels at 6.8, but moisture is below optimal at 45%. Weather forecasts indicate light rain expected in the next 2 days, which will help with moisture levels but may require attention to drainage.

Based on the current conditions, your immediate priority should be to provide light irrigation today to ensure proper growth before the expected rainfall. The moderate stress levels suggest the crop could benefit from a nitrogen boost, so consider applying starter fertilizer (NPK 20:20:20) after the rainfall to support tiller development. Monitor for any signs of pest infestation, particularly aphids and armyworms, which are common during this growth stage.

In the coming week, focus on maintaining adequate soil moisture and monitoring for disease development, especially with the expected increase in humidity. Prepare for post-rain weed control as the moisture will promote weed growth. Ensure your field has proper drainage to prevent waterlogging during heavy rainfall periods."

Now analyze this comprehensive farmer data and return ONLY the JSON object with the detailed_advice field containing practical, actionable farming advice:`;

async function analyzeFarmerData(farmerData) {
  try {
    const prompt = `${agriculturalExpertPrompt}

Farmer Data:
${JSON.stringify(farmerData, null, 2)}

Please provide your analysis in the exact format specified above.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0",
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

// Function to clean AI responses and ensure proper formatting
function cleanAIResponse(response) {
  if (!response) return '';
  
  // Remove excessive formatting and normalize text
  let cleaned = response
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\n{3,}/g, '\n\n') // Reduce excessive line breaks
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\s+/g, ' '); // Normalize spaces
  
  return cleaned;
}

// Function to extract JSON data from AI response
function extractJSONFromResponse(aiResponse) {
  try {
    // Clean the response first
    const cleanedResponse = cleanAIResponse(aiResponse);
    
    // Since AI now returns only JSON, try to parse the entire response
    const parsed = JSON.parse(cleanedResponse.trim());
    console.log('✅ Successfully parsed JSON data:', parsed);
    return parsed;
  } catch (error) {
    console.error('❌ Error parsing JSON data:', error.message);
    
    // Fallback: try to find any JSON-like structure in the response
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const cleaned = cleanAIResponse(jsonMatch[0]);
        const parsed = JSON.parse(cleaned);
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
  getCriticalAlerts,
  cleanAIResponse
};
export default analyzeFarmerData;
