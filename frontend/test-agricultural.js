// Test file for Agricultural Expert AI System with Growth Stage Analysis
// Run this in the browser console or Node.js

// Sample weather data (7 days)
const sampleWeatherData = [
  { date: '2024-01-15', temperature: 22, rainfall: 15, humidity: 65, wind: 8 },
  { date: '2024-01-16', temperature: 24, rainfall: 8, humidity: 60, wind: 12 },
  { date: '2024-01-17', temperature: 26, rainfall: 0, humidity: 55, wind: 15 },
  { date: '2024-01-18', temperature: 28, rainfall: 0, humidity: 50, wind: 18 },
  { date: '2024-01-19', temperature: 30, rainfall: 0, humidity: 45, wind: 20 },
  { date: '2024-01-20', temperature: 32, rainfall: 0, humidity: 40, wind: 22 },
  { date: '2024-01-21', temperature: 34, rainfall: 0, humidity: 35, wind: 25 }
];

// Test function for growth stage analysis
function testGrowthStageAnalysis() {
  console.log('🌾 Testing Agricultural Expert AI System - Growth Stage Analysis');
  console.log('================================================================\n');
  
  // Test 1: Wheat in vegetative stage
  console.log('Test 1: Wheat planted 45 days ago (vegetative stage)');
  console.log('NDVI: 0.4 (moderate stress)');
  console.log('Expected: Vegetative stage with growth-specific advice\n');
  
  // Test 2: Rice in grain filling stage
  console.log('Test 2: Rice planted 80 days ago (grain filling stage)');
  console.log('NDVI: 0.7 (healthy)');
  console.log('Expected: Grain filling stage with harvest preparation advice\n');
  
  // Test 3: Corn in early vegetative stage
  console.log('Test 3: Corn planted 20 days ago (early vegetative)');
  console.log('NDVI: 0.2 (severe stress)');
  console.log('Expected: Vegetative stage with emergency recovery advice\n');
  
  // Test 4: Cotton in flowering stage
  console.log('Test 4: Cotton planted 70 days ago (flowering stage)');
  console.log('NDVI: 0.6 (healthy)');
  console.log('Expected: Flowering stage with pollination protection advice\n');
  
  console.log('✅ Test scenarios defined. Run the actual tests in your app!');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testGrowthStageAnalysis, sampleWeatherData };
} else {
  // Browser environment
  window.testGrowthStageAnalysis = testGrowthStageAnalysis;
  window.sampleWeatherData = sampleWeatherData;
}

// Auto-run if this file is executed directly
if (typeof window !== 'undefined') {
  console.log('🌾 Agricultural Expert AI System - Growth Stage Test File Loaded');
  console.log('Run testGrowthStageAnalysis() to see test scenarios');
}
