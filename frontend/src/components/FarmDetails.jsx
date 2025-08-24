import { useParams, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import './FarmDetails.css'

const FarmDetails = ({ crops }) => {
  const { id } = useParams()
  const crop = crops.find(c => c.id === parseInt(id))

  const [selectedTimestamp, setSelectedTimestamp] = useState('');

  useEffect(() => {
    if (crop && crop.growthCycleData && crop.growthCycleData.length > 0) {
      setSelectedTimestamp(crop.growthCycleData[0].timestamp);
    }
  }, [crop]);

  if (!crop) {
    return (
      <div className="farm-details">
        <div className="error-state">
          <h2>Farm Not Found</h2>
          <p>The farm you\'re looking for doesn\'t exist.</p>
          <Link to="/my-farms" className="back-btn">
            ← Back to My Farms
          </Link>
        </div>
      </div>
    );
  }

  const selectedGrowthCycleData = crop.growthCycleData.find(data => data.timestamp === selectedTimestamp);

  return (
    <div className="farm-details">
      <div className="details-header">
        <Link to="/my-farms" className="back-btn">
          ← Back to My Farms
        </Link>
        <h2>{crop.farmName}</h2>
        <p className="farm-subtitle">Detailed Information & Analytics</p>
      </div>

      <div className="details-content">
        {/* Basic Information */}
        <div className="info-section">
          <h3>🌱 Basic Information</h3>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🏡</div>
              <div className="info-content">
                <h4>Farm Name</h4>
                <p>{crop.farmName}</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h4>Location</h4>
                <p>{crop.location}</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🌾</div>
              <div className="info-content">
                <h4>Crop Type</h4>
                <p>{crop.cropType}</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <h4>Date of Sowing</h4>
                <p>{crop.sowingDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Backend API Response Data */}
        <div className="api-section">
          <h3>📊 Analytics & Insights</h3>
          <div className="api-grid">
            <div className="info-card">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <h4>Select Date</h4>
                <select
                  value={selectedTimestamp}
                  onChange={(e) => setSelectedTimestamp(e.target.value)}
                  className="date-select"
                >
                  {crop.growthCycleData.map((dataItem) => (
                    <option key={dataItem.timestamp} value={dataItem.timestamp}>
                      {new Date(dataItem.timestamp).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Weather Temperature */}
            <div className="api-card weather">
              <div className="api-header">
                <h4>🌡️ Weather Temperature (Last 5 Days)</h4>
              </div>
              <div className="weather-table-container">
                {selectedGrowthCycleData && selectedGrowthCycleData.weatherForecast && selectedGrowthCycleData.weatherForecast.temperatureCelsius && selectedGrowthCycleData.weatherForecast.temperatureCelsius.length > 0 ? (
                  <table className="weather-table">
                    <thead>
                      <tr>
                        {[...Array(selectedGrowthCycleData.weatherForecast.temperatureCelsius.length)].map((_, index) => (
                          <th key={index}>Day {index - selectedGrowthCycleData.weatherForecast.temperatureCelsius.length + 1 === 0 ? 'Current' : index - selectedGrowthCycleData.weatherForecast.temperatureCelsius.length + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {selectedGrowthCycleData.weatherForecast.temperatureCelsius.map((temp, index) => (
                          <td key={index}>{temp}°C</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p>No temperature data available for this date.</p>
                )}
              </div>
              <p className="weather-analysis">{selectedGrowthCycleData && selectedGrowthCycleData.weatherForecast ? selectedGrowthCycleData.weatherForecast.analysis : 'Weather analysis not available.'}</p>
            </div>

            {/* NDVI Data */}
            <div className="api-card ndvi">
              <div className="api-header">
                <h4>🛰️ NDVI Value</h4>
                <span className="api-value">
                  {selectedGrowthCycleData && selectedGrowthCycleData.ndviData ? selectedGrowthCycleData.ndviData.currentValue : 'N/A'}
                </span>
              </div>
              <p>{selectedGrowthCycleData && selectedGrowthCycleData.ndviData ? selectedGrowthCycleData.ndviData.analysis : 'NDVI data not available for this date.'}</p>
            </div>
            
            {/* Nutrient Health */}
            <div className="api-card health">
              <div className="api-header">
                <h4>💚 Crop Health</h4>
                <span className={`api-value health-${selectedGrowthCycleData && selectedGrowthCycleData.cropHealth ? selectedGrowthCycleData.cropHealth.toLowerCase().replace(/[^a-z0-9]/gi, '') : 'na'}`}>
                  {selectedGrowthCycleData ? selectedGrowthCycleData.cropHealth : 'N/A'}
                </span>
              </div>
              <p>Overall crop health assessment based on the selected date.</p>
            </div>
            
            <div className="api-card market">
              <div className="api-header">
                <h4>📈 Market Trend</h4>
                <span className={`api-value market-${selectedGrowthCycleData && selectedGrowthCycleData.marketPrice && selectedGrowthCycleData.marketPrice.status ? selectedGrowthCycleData.marketPrice.status.toLowerCase().replace(/[^a-z0-9]/gi, '') : 'na'}`}>
                  {selectedGrowthCycleData && selectedGrowthCycleData.marketPrice ? selectedGrowthCycleData.marketPrice.status : 'N/A'}
                </span>
              </div>
              {selectedGrowthCycleData && selectedGrowthCycleData.marketPrice && selectedGrowthCycleData.marketPrice.status === 'Ready for sale' && (
                <div className="market-details">
                  <p>Current Price: ₹{selectedGrowthCycleData.marketPrice.currentPrice || 'N/A'}</p>
                  <p>Expected Range (next 30 days): ₹{selectedGrowthCycleData.marketPrice.expectedRangeNext30Days ? selectedGrowthCycleData.marketPrice.expectedRangeNext30Days.join(' - ') : 'N/A'}</p>
                </div>
              )}
              <p className="market-analysis">{selectedGrowthCycleData && selectedGrowthCycleData.marketPrice ? selectedGrowthCycleData.marketPrice.trendAnalysis : 'Market trend data not available.'}</p>
            </div>

            {/* Alerts */}
            <div className="api-card alerts">
              <div className="api-header">
                <h4>🔔 Alerts</h4>
              </div>
              <div className="alerts-content">
                {selectedGrowthCycleData && selectedGrowthCycleData.alerts && selectedGrowthCycleData.alerts.length > 0 ? (
                  <ul>
                    {selectedGrowthCycleData.alerts.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No alerts for this date.</p>
                )}
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="api-card recommended-actions">
              <div className="api-header">
                <h4>✅ Recommended Actions</h4>
              </div>
              <div className="actions-content">
                {selectedGrowthCycleData && selectedGrowthCycleData.recommendedActions && selectedGrowthCycleData.recommendedActions.length > 0 ? (
                  <ul>
                    {selectedGrowthCycleData.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No recommended actions for this date.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetails;
