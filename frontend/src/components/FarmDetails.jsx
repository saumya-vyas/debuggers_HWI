import { useParams, Link } from 'react-router-dom'
import './FarmDetails.css'

const FarmDetails = ({ crops }) => {
  const { id } = useParams()
  const crop = crops.find(c => c.id === parseInt(id))

  if (!crop) {
    return (
      <div className="farm-details">
        <div className="error-state">
          <h2>Farm Not Found</h2>
          <p>The farm you're looking for doesn't exist.</p>
          <Link to="/my-farms" className="back-btn">
            ← Back to My Farms
          </Link>
        </div>
      </div>
    )
  }

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
            <div className="api-card weather">
              <div className="api-header">
                <h4>🌡️ Weather Temperature</h4>
                <span className="api-value">{crop.weatherTemperature}</span>
              </div>
              <p>Current weather conditions affecting your crop growth</p>
            </div>
            
            <div className="api-card health">
              <div className="api-header">
                <h4>💚 Nutrient Health</h4>
                <span className={`api-value health-${crop.nutrientHealth.toLowerCase()}`}>
                  {crop.nutrientHealth}
                </span>
              </div>
              <p>Soil nutrient levels and crop health assessment</p>
            </div>
            
            <div className="api-card market">
              <div className="api-header">
                <h4>📈 Market Trend</h4>
                <span className={`api-value market-${crop.marketTrend.toLowerCase()}`}>
                  {crop.marketTrend}
                </span>
              </div>
              <p>Current market conditions and price trends</p>
            </div>
            
            <div className="api-card improvement">
              <div className="api-header">
                <h4>💡 Improvement Suggestions</h4>
              </div>
              <p className="improvement-text">{crop.improvement}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/" className="action-btn primary">
              + Add New Crop
            </Link>
            <button className="action-btn secondary">
              📝 Update Farm Info
            </button>
            <button className="action-btn secondary">
              📊 View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmDetails
