import React, { useState, useEffect } from 'react';
import weatherAPI, { 
  getCurrentWeather, 
  getForecastData, 
  getWeatherSummary 
} from './weather';

const WeatherDemo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({ lat: 28.6139, lon: 77.2090 }); // Default: New Delhi

  // Sample coordinates for different cities
  const sampleLocations = [
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 }
  ];

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching weather data for:', lat, lon);
      const data = await weatherAPI.getAllWeatherData(lat, lon);
      console.log('Received weather data:', data);
      
      if (data) {
        setWeatherData(data);
        console.log('Weather Summary:', getWeatherSummary());
        console.log('Current Weather:', getCurrentWeather());
        console.log('Forecast Data:', getForecastData());
      } else {
        setError('No weather data received from API');
      }
    } catch (err) {
      console.error('Error in fetchWeatherData:', err);
      setError(`Failed to fetch weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const testAndFetchWeather = async () => {
      // First test API connection comprehensively
      const apiWorking = await weatherAPI.testAPIConnectionComprehensive();
      if (!apiWorking) {
        setError('API connection failed. Please check your API key and internet connection. Check browser console for detailed error information.');
        return;
      }
      
      // If API is working, fetch weather data
      fetchWeatherData(location.lat, location.lon);
    };
    
    testAndFetchWeather();
  }, [location]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading weather data...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div style={{ padding: '20px' }}>No weather data available</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🌤️ Weather Data Demo</h1>
      
      {/* Location Selector */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📍 Select Location:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {sampleLocations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => handleLocationChange(loc)}
              style={{
                padding: '8px 16px',
                backgroundColor: location.name === loc.name ? '#007bff' : '#f8f9fa',
                color: location.name === loc.name ? 'white' : '#333',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Weather */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <h2>🌡️ Current Weather - {weatherData.location.city}, {weatherData.location.country}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Temperature:</strong> {weatherData.current_conditions.temperature.current}°C
            <br />
            <small>Feels like: {weatherData.current_conditions.temperature.feels_like}°C</small>
          </div>
          <div>
            <strong>Humidity:</strong> {weatherData.current_conditions.humidity}%
          </div>
          <div>
            <strong>Wind:</strong> {weatherData.current_conditions.wind.speed} km/h
            <br />
            <small>Direction: {weatherData.current_conditions.wind.direction}°</small>
          </div>
          <div>
            <strong>Weather:</strong> {weatherData.current_conditions.weather.description}
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div style={{ 
        backgroundColor: '#f3e5f5', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <h2>📅 5-Day Forecast</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          {weatherData.forecast_summary.next_5_days.map((day, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '15px', 
              borderRadius: '6px',
              textAlign: 'center',
              border: '1px solid #dee2e6'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <div style={{ fontSize: '1.2em', marginBottom: '5px' }}>
                {day.temperature.average}°C
              </div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                {day.temperature.min}°C / {day.temperature.max}°C
              </div>
              <div style={{ marginTop: '5px' }}>
                💧 {day.precipitation}mm
              </div>
              <div style={{ fontSize: '0.8em', color: '#888' }}>
                {day.weather_condition}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.weather_alerts.length > 0 && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          <h2>⚠️ Weather Alerts</h2>
          {weatherData.weather_alerts.map((alert, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '10px', 
              marginBottom: '10px', 
              borderRadius: '4px',
              borderLeft: `4px solid ${alert.severity === 'high' ? '#dc3545' : '#ffc107'}`
            }}>
              <strong>{alert.type.toUpperCase()}:</strong> {alert.message}
              <span style={{ 
                float: 'right', 
                backgroundColor: alert.severity === 'high' ? '#dc3545' : '#ffc107',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.8em'
              }}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Agricultural Insights */}
      {weatherData.agricultural_insights.length > 0 && (
        <div style={{ 
          backgroundColor: '#d1ecf1', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          <h2>🌾 Agricultural Insights</h2>
          {weatherData.agricultural_insights.map((insight, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '10px', 
              marginBottom: '10px', 
              borderRadius: '4px',
              borderLeft: `4px solid ${insight.priority === 'high' ? '#dc3545' : '#ffc107'}`
            }}>
              <strong>{insight.category}:</strong> {insight.message}
              <span style={{ 
                float: 'right', 
                backgroundColor: insight.priority === 'high' ? '#dc3545' : '#ffc107',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.8em'
              }}>
                {insight.priority}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Raw JSON Data */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
        <h2>📋 Raw JSON Data</h2>
        <details>
          <summary>Click to view raw data</summary>
          <pre style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '400px',
            fontSize: '12px'
          }}>
            {JSON.stringify(weatherData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default WeatherDemo;
