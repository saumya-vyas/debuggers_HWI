import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import FarmField3D from './FarmField3D'
import './MyFarms.css'

const MyFarms = ({ crops }) => {
  const navigate = useNavigate()

  // Add body class to disable scrolling when MyFarms is active
  useEffect(() => {
    document.body.classList.add('myfarms-active')
    
    // Cleanup: remove class when component unmounts
    return () => {
      document.body.classList.remove('myfarms-active')
    }
  }, [])

  if (crops.length === 0) {
    return (
      <div className="my-farms-3d">
        <div className="farms-header-3d">
          <h2>My Farms</h2>
          <p>You haven't added any crops yet. Start by adding your first crop!</p>
          <Link to="/" className="add-first-crop-btn">
            Add Your First Crop
          </Link>
        </div>
      </div>
    )
  }

  const handleFarmClick = (farmId) => {
    navigate(`/farm/${farmId}`)
  }

  const displayFarms = crops.slice(0, 9) // Only show first 9 farms in 3x3 grid
  const hasMoreFarms = crops.length > 9

  return (
    <div className="my-farms-3d">
     

      {/* Grid limit warning */}
      {hasMoreFarms && (
        <div className="grid-limit-warning">
          <p>⚠️ Showing first 9 farms in 3x3 grid. You have {crops.length} total farms.</p>
        </div>
      )}

      <div className="farms-3d-container">
        <FarmField3D 
          farms={displayFarms} 
          onFarmClick={handleFarmClick}
          scale={1.2} /* Increased scale for larger farm */
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
