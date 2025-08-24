// Demo file showing how to use the Farmer Alert Generator
import { 
  generateFarmerAlertMessage, 
  generateMultipleAlerts, 
  getCurrentWeatherSummary,
  validateInputs 
} from './farmerAlertGenerator.js';

/**
 * Demo function to test single alert generation
 */
async function demoSingleAlert() {
  console.log('🚀 Demo: Single Alert Generation');
  console.log('================================');
  
  try {
    // Test with wheat in North India
    const alert = await generateFarmerAlertMessage('North India', 'Wheat');
    
    if (alert.success) {
      console.log('✅ Alert Generated Successfully:');
      console.log(`📍 Location: ${alert.location}`);
      console.log(`🌾 Crop: ${alert.crop}`);
      console.log(`⚠️  Alert: ${alert.alert}`);
      console.log(`🌤️  Weather: ${alert.weather.temperature}, ${alert.weather.rainfall}`);
      console.log(`⏰ Generated: ${alert.timestamp}`);
      console.log(`🤖 AI: ${alert.generated_by}`);
    } else {
      console.log('❌ Alert Generation Failed:', alert.error);
    }
  } catch (error) {
    console.error('💥 Demo Error:', error);
  }
}

/**
 * Demo function to test multiple alerts generation
 */
async function demoMultipleAlerts() {
  console.log('\n🚀 Demo: Multiple Alerts Generation');
  console.log('===================================');
  
  try {
    const cropLocationPairs = [
      { crop: 'Wheat', location: 'North India' },
      { crop: 'Rice', location: 'South India' },
      { crop: 'Corn', location: 'Central India' }
    ];
    
    const alerts = await generateMultipleAlerts(cropLocationPairs);
    
    console.log(`✅ Generated ${alerts.length} alerts:`);
    alerts.forEach((alert, index) => {
      if (alert.success) {
        console.log(`\n${index + 1}. ${alert.crop} in ${alert.location}:`);
        console.log(`   ⚠️  ${alert.alert}`);
      } else {
        console.log(`\n${index + 1}. ❌ Failed for ${alert.crop} in ${alert.location}: ${alert.error}`);
      }
    });
  } catch (error) {
    console.error('💥 Demo Error:', error);
  }
}

/**
 * Demo function to test weather summary
 */
async function demoWeatherSummary() {
  console.log('\n🚀 Demo: Weather Summary');
  console.log('========================');
  
  try {
    const weatherSummary = await getCurrentWeatherSummary();
    
    if (weatherSummary) {
      console.log('✅ Current Weather Summary:');
      console.log(`🌡️  Temperature: ${weatherSummary.current.temperature}`);
      console.log(`🌧️  Rainfall: ${weatherSummary.current.rainfall}`);
      console.log(`💧 Humidity: ${weatherSummary.current.humidity}`);
      console.log(`🌤️  Condition: ${weatherSummary.current.condition}`);
      console.log(`⏰ Timestamp: ${weatherSummary.timestamp}`);
      
      console.log('\n📅 3-Day Forecast:');
      weatherSummary.forecast.forEach((day, index) => {
        console.log(`   Day ${index + 1}: ${day.day} - ${day.temp}, ${day.condition}`);
      });
    } else {
      console.log('❌ Failed to get weather summary');
    }
  } catch (error) {
    console.error('💥 Demo Error:', error);
  }
}

/**
 * Demo function to test input validation
 */
function demoInputValidation() {
  console.log('\n🚀 Demo: Input Validation');
  console.log('==========================');
  
  const testCases = [
    { crop: 'Wheat', location: 'North India' },
    { crop: '', location: 'South India' },
    { crop: 'Rice', location: '' },
    { crop: 'A'.repeat(60), location: 'Central India' },
    { crop: 'Corn', location: 'A'.repeat(150) }
  ];
  
  testCases.forEach((testCase, index) => {
    const validation = validateInputs(testCase.crop, testCase.location);
    
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`   Crop: "${testCase.crop}"`);
    console.log(`   Location: "${testCase.location}"`);
    console.log(`   Valid: ${validation.isValid ? '✅ Yes' : '❌ No'}`);
    
    if (!validation.isValid) {
      console.log(`   Errors: ${validation.errors.join(', ')}`);
    }
  });
}

/**
 * Demo function to test error handling
 */
async function demoErrorHandling() {
  console.log('\n🚀 Demo: Error Handling');
  console.log('========================');
  
  try {
    // Test with invalid inputs
    console.log('Testing with invalid crop...');
    const alert1 = await generateFarmerAlertMessage('', 'Wheat');
    console.log('Result:', alert1.success ? '✅ Success' : '❌ Failed');
    
    console.log('\nTesting with invalid location...');
    const alert2 = await generateFarmerAlertMessage('North India', '');
    console.log('Result:', alert2.success ? '✅ Success' : '❌ Failed');
    
  } catch (error) {
    console.error('💥 Error Handling Demo Error:', error);
  }
}

/**
 * Main demo runner function
 */
async function runAllDemos() {
  console.log('🌾 Farmer Alert Generator - Demo Suite');
  console.log('======================================');
  console.log('This demo shows how to use the farmer alert generator functions.\n');
  
  // Run all demos
  await demoSingleAlert();
  await demoMultipleAlerts();
  await demoWeatherSummary();
  demoInputValidation();
  await demoErrorHandling();
  
  console.log('\n🎉 All demos completed!');
  console.log('\n📚 Usage Examples:');
  console.log('   import { generateFarmerAlertMessage } from "./farmerAlertGenerator.js";');
  console.log('   const alert = await generateFarmerAlertMessage("North India", "Wheat");');
  console.log('   console.log(alert.alert);');
}

// Export demo functions for external use
export {
  demoSingleAlert,
  demoMultipleAlerts,
  demoWeatherSummary,
  demoInputValidation,
  demoErrorHandling,
  runAllDemos
};

// Auto-run demos if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - add to window for console testing
  window.farmerAlertDemos = {
    demoSingleAlert,
    demoMultipleAlerts,
    demoWeatherSummary,
    demoInputValidation,
    demoErrorHandling,
    runAllDemos
  };
  
  console.log('🌾 Farmer Alert Demos loaded!');
  console.log('Run demos in console:');
  console.log('  farmerAlertDemos.runAllDemos()');
  console.log('  farmerAlertDemos.demoSingleAlert()');
  console.log('  farmerAlertDemos.demoMultipleAlerts()');
}
