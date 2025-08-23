import { useNavigate, Link } from 'react-router-dom'
import FarmField3D from './FarmField3D'
import './MyFarms.css'

const MyFarms = ({ crops }) => {
  const navigate = useNavigate()

  if (crops.length === 0) {
    return (
      <div className="my-farms-3d">
        <div className="farms-header-3d">
          <h2>My Farms</h2>
          <p>You haven't added any crops yet. Start by adding your first crop!</p>
        </div>
      </div>
    )
  }

  const handleFarmClick = (farmId) => {
    navigate(`/farm/${farmId}`)
  }

  return (
    <div className="my-farms-3d">
      <div className="farms-header-3d">
        <h2>My Farms</h2>
        <p>Explore your farms in an immersive 3D world</p>
      </div>

      <div className="farms-3d-container">
        <FarmField3D 
          farms={crops} 
          onFarmClick={handleFarmClick}
        />
        
        {/* 3D View Legend */}
        <div className="legend-3d">
          <h4>🌾 Field Legend</h4>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4ade80' }}></div>
            <span className="legend-text">Excellent Health</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#22c55e' }}></div>
            <span className="legend-text">Good Health</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#eab308' }}></div>
            <span className="legend-text">Fair Health</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="legend-text">Poor Health</span>
          </div>
        </div>

        {/* 3D Controls Info */}
        <div className="controls-overlay-3d">
          <h4>🎮 Controls</h4>
          <p><strong>Mouse:</strong> Click & drag to rotate</p>
          <p><strong>Scroll:</strong> Zoom in/out</p>
          <p><strong>Click:</strong> Select farm</p>
          <p><strong>Hover:</strong> Fields lift up</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="farms-stats-3d">
        <div className="stat-card-3d">
          <div className="stat-icon">🌾</div>
          <div className="stat-content">
            <div className="stat-number">{crops.length}</div>
            <div className="stat-label">Total Farms</div>
          </div>
        </div>
        
        <div className="stat-card-3d">
          <div className="stat-icon">💚</div>
          <div className="stat-content">
            <div className="stat-number">
              {crops.filter(crop => crop.nutrientHealth === 'Excellent').length}
            </div>
            <div className="stat-label">Excellent Health</div>
          </div>
        </div>
        
        <div className="stat-card-3d">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">
              {crops.filter(crop => crop.marketTrend === 'Rising').length}
            </div>
            <div className="stat-label">Rising Market</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyFarms
