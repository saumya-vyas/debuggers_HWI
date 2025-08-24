# 🌾 Agricultural Expert AI System

A simple AI system that provides crop advice to farmers based on NDVI values and weather data.

## 🎯 What It Does

The system analyzes:
- **Crop type** (wheat, rice, corn, cotton, sugarcane)
- **NDVI value** (crop health index: -1 to +1)
- **Weather forecast** (7-day temperature, rainfall, humidity, wind)

And provides:
- **Crop Health Classification** (Healthy, Moderate Stress, Severe Stress)
- **Practical Advice** (irrigation, fertilizer, pest control, timing)
- **Risk Alerts** (drought, flooding, pest attacks)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📖 Usage Examples

### Basic Usage
```javascript
import { generateCropAdvice } from './src/gen-ai';

// Sample weather data (7 days)
const weatherData = [
  { date: '2024-01-15', temperature: 22, rainfall: 15, humidity: 65, wind: 8 },
  // ... 6 more days
];

// Generate advice for wheat with NDVI 0.4
const advice = generateCropAdvice('wheat', 0.4, weatherData);
console.log(advice);
```

### Using the Class
```javascript
import { AgriculturalExpert } from './src/gen-ai';

const expert = new AgriculturalExpert();
const allData = expert.getAllData();
const stats = expert.getHealthStatistics();
```

## 🌱 Supported Crops

- **Wheat** - Optimal temp: 15-25°C, rainfall: 400-800mm
- **Rice** - Optimal temp: 20-35°C, rainfall: 1000-2000mm  
- **Corn** - Optimal temp: 18-32°C, rainfall: 500-1000mm
- **Cotton** - Optimal temp: 20-30°C, rainfall: 600-1200mm
- **Sugarcane** - Optimal temp: 25-35°C, rainfall: 800-1500mm

## 📊 NDVI Health Classification

- **< 0.3** = Severe Stress (Poor)
- **0.3 - 0.6** = Moderate Stress  
- **> 0.6** = Healthy

## 🔧 Features

- ✅ **Crop Health Analysis** - Based on NDVI values
- ✅ **Weather Risk Assessment** - Temperature, rainfall, wind analysis
- ✅ **Practical Recommendations** - Farmer-friendly advice
- ✅ **Data Export** - JSON and CSV formats
- ✅ **Sample Data Generation** - For testing and demonstration
- ✅ **React Component** - Ready-to-use UI

## 📁 Project Structure

```
src/gen-ai/
├── agriculturalExpert.js      # Core logic and functions
├── components/
│   └── AgriculturalAdvisor.jsx # React UI component
├── demo.js                     # Usage examples
└── index.js                    # Main exports
```

## 🎮 Demo

Run the demo to see examples:
```javascript
import { runDemo } from './src/gen-ai/demo.js';
runDemo();
```

## 📝 Output Format

The system returns structured JSON data:
```json
{
  "cropType": "Wheat",
  "ndviValue": 0.4,
  "cropHealth": "Moderate Stress",
  "weatherRisk": "moderate",
  "weatherAlerts": ["Low rainfall alert: 23mm"],
  "recommendedActions": [
    "Increase irrigation frequency by 20%",
    "Apply nitrogen-rich fertilizer (30-10-10)",
    "Check soil moisture at root level"
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🌟 Key Benefits

- **No External APIs** - Works with local data
- **Farmer-Friendly** - Simple, practical advice
- **Comprehensive** - Covers all major crop types
- **Realistic** - Based on agricultural best practices
- **Extensible** - Easy to add new crops and features

Perfect for agricultural applications, educational purposes, or as a foundation for more advanced farming AI systems!
