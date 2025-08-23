import React, { useState, useEffect } from 'react';
import { analyzeFarmerData, setResponse, getResponse } from './config';

const Farmer = () => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Comprehensive sample farmer data with dummy values for missing information
  const sampleFarmerData = {
    "farmer_name": "Ramesh Kumar",
    "crop": "wheat",
    "seeding_date": "2025-01-15",
    "ndvi": 0.38,
    "weather": {
      "current": {
        "temperature": "28°C",
        "rainfall": "0mm",
        "humidity": "65%",
        "wind": "moderate (15 km/h)",
        "sunlight": "8 hours"
      },
      "forecast": [
        {
          "date": "2025-01-20",
          "temperature": "26°C",
          "rainfall": "15mm",
          "humidity": "75%",
          "wind": "light (8 km/h)"
        },
        {
          "date": "2025-01-21",
          "temperature": "24°C",
          "rainfall": "25mm",
          "humidity": "80%",
          "wind": "moderate (12 km/h)"
        },
        {
          "date": "2025-01-22",
          "temperature": "22°C",
          "rainfall": "30mm",
          "humidity": "85%",
          "wind": "strong (20 km/h)"
        },
        {
          "date": "2025-01-23",
          "temperature": "25°C",
          "rainfall": "10mm",
          "humidity": "70%",
          "wind": "moderate (15 km/h)"
        },
        {
          "date": "2025-01-24",
          "temperature": "27°C",
          "rainfall": "5mm",
          "humidity": "60%",
          "wind": "light (10 km/h)"
        },
        {
          "date": "2025-01-25",
          "temperature": "29°C",
          "rainfall": "0mm",
          "humidity": "55%",
          "wind": "moderate (18 km/h)"
        },
        {
          "date": "2025-01-26",
          "temperature": "31°C",
          "rainfall": "0mm",
          "humidity": "50%",
          "wind": "strong (25 km/h)"
        }
      ]
    },
    "soil_conditions": {
      "soil_type": "loamy",
      "ph_level": "6.8",
      "moisture": "45%",
      "nitrogen": "medium",
      "phosphorus": "low",
      "potassium": "high",
      "organic_matter": "2.1%"
    },
    "field_info": {
      "field_size": "2.5 acres",
      "irrigation_type": "drip irrigation",
      "previous_crop": "rice",
      "crop_rotation": "wheat-rice-pulses",
      "pest_history": "minor aphid infestation last season"
    },
    "management_practices": {
      "last_fertilizer": "2025-01-10",
      "fertilizer_type": "NPK 20:20:20",
      "last_irrigation": "2025-01-12",
      "weed_control": "manual + herbicide",
      "last_pest_control": "2025-01-08"
    }
  };

  useEffect(() => {
    const fetchAgriculturalAnalysis = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await analyzeFarmerData(sampleFarmerData);
        setAnalysis(result);
        setResponse(result); // Store in the response variable
      } catch (err) {
        setError('Failed to analyze farmer data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgriculturalAnalysis();
  }, []);

  if (loading) {
    return <div>Analyzing crop data and generating comprehensive recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>🌾 Agricultural Expert AI Assistant</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '8px' }}>
          <h2>👨‍🌾 Farmer Information</h2>
          <p><strong>Name:</strong> {sampleFarmerData.farmer_name}</p>
          <p><strong>Crop:</strong> {sampleFarmerData.crop}</p>
          <p><strong>Seeding Date:</strong> {sampleFarmerData.seeding_date}</p>
          <p><strong>Field Size:</strong> {sampleFarmerData.field_info.field_size}</p>
        </div>
        
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px' }}>
          <h2>📊 Current Status</h2>
          <p><strong>NDVI Value:</strong> {sampleFarmerData.ndvi} (Moderate Stress)</p>
          <p><strong>Current Temperature:</strong> {sampleFarmerData.weather.current.temperature}</p>
          <p><strong>Soil Moisture:</strong> {sampleFarmerData.soil_conditions.moisture}</p>
          <p><strong>Last Irrigation:</strong> {sampleFarmerData.management_practices.last_irrigation}</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🌤️ 7-Day Weather Forecast</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
          {sampleFarmerData.weather.forecast.map((day, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '10px', 
              borderRadius: '5px',
              textAlign: 'center',
              border: '1px solid #dee2e6'
            }}>
              <div style={{ fontWeight: 'bold' }}>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <div>{day.temperature}</div>
              <div style={{ color: '#007bff' }}>{day.rainfall}</div>
              <div style={{ fontSize: '0.9em', color: '#6c757d' }}>{day.humidity}</div>
            </div>
          ))}
        </div>
      </div>

      <h3>🤖 AI Analysis & Recommendations:</h3>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        fontSize: '14px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {analysis}
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
        <h4>💾 Response Storage Status:</h4>
        <p>{getResponse() ? '✅ AI analysis stored successfully in response variable' : '❌ No response stored yet'}</p>
      </div>
    </div>
  );
};

export default Farmer;