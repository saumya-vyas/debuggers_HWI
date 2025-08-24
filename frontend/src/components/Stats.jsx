import { Link } from 'react-router-dom'
import './Stats.css'

const Stats = ({ crops = [], activities = [] }) => {
  // Calculate detailed statistics
  const totalFarms = crops.length
  const totalActivities = activities.length
  
  // Activities in the last 7 days
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const activitiesThisWeek = activities.filter(activity => {
    const activityDate = new Date(activity.date)
    return activityDate >= weekAgo
  }).length

  // Health statistics
  const excellentHealth = crops.filter(crop => crop.nutrientHealth === 'Excellent').length
  const goodHealth = crops.filter(crop => crop.nutrientHealth === 'Good').length
  const fairHealth = crops.filter(crop => crop.nutrientHealth === 'Fair').length
  const poorHealth = crops.filter(crop => crop.nutrientHealth === 'Poor').length

  // Market trends
  const risingMarket = crops.filter(crop => crop.marketTrend === 'Rising').length
  const stableMarket = crops.filter(crop => crop.marketTrend === 'Stable').length
  const decliningMarket = crops.filter(crop => crop.marketTrend === 'Declining').length

  // Unique farms involved in activities
  const farmsInvolved = new Set(activities.map(activity => activity.farmName)).size

  // Recent activities (last 5)
  const recentActivities = activities.slice(0, 5)

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h2>📊 Detailed Statistics</h2>
        <p>Comprehensive overview of your farming operations</p>
      </div>

      <div className="stats-grid">
        {/* Farm Statistics */}
        <div className="stats-section">
          <h3>🏡 Farm Statistics</h3>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">🌾</div>
              <div className="stat-content">
                <div className="stat-number">{totalFarms}</div>
                <div className="stat-label">Total Farms</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💚</div>
              <div className="stat-content">
                <div className="stat-number">{excellentHealth}</div>
                <div className="stat-label">Excellent Health</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-number">{risingMarket}</div>
                <div className="stat-label">Rising Market</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Statistics */}
        <div className="stats-section">
          <h3>📅 Activity Statistics</h3>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-number">{totalActivities}</div>
                <div className="stat-label">Total Activities</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <div className="stat-number">{activitiesThisWeek}</div>
                <div className="stat-label">This Week</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🏡</div>
              <div className="stat-content">
                <div className="stat-number">{farmsInvolved}</div>
                <div className="stat-label">Farms Involved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Distribution */}
        <div className="stats-section">
          <h3>💚 Health Distribution</h3>
          <div className="health-chart">
            <div className="health-bar">
              <div className="health-label">Excellent</div>
              <div className="health-progress">
                <div 
                  className="health-fill excellent" 
                  style={{ width: `${totalFarms > 0 ? (excellentHealth / totalFarms) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="health-count">{excellentHealth}</div>
            </div>
            
            <div className="health-bar">
              <div className="health-label">Good</div>
              <div className="health-progress">
                <div 
                  className="health-fill good" 
                  style={{ width: `${totalFarms > 0 ? (goodHealth / totalFarms) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="health-count">{goodHealth}</div>
            </div>
            
            <div className="health-bar">
              <div className="health-label">Fair</div>
              <div className="health-progress">
                <div 
                  className="health-fill fair" 
                  style={{ width: `${totalFarms > 0 ? (fairHealth / totalFarms) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="health-count">{fairHealth}</div>
            </div>
            
            <div className="health-bar">
              <div className="health-label">Poor</div>
              <div className="health-progress">
                <div 
                  className="health-fill poor" 
                  style={{ width: `${totalFarms > 0 ? (poorHealth / totalFarms) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="health-count">{poorHealth}</div>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="stats-section">
          <h3>📈 Market Trends</h3>
          <div className="market-trends">
            <div className="trend-item">
              <div className="trend-icon rising">📈</div>
              <div className="trend-content">
                <div className="trend-label">Rising</div>
                <div className="trend-count">{risingMarket}</div>
              </div>
            </div>
            
            <div className="trend-item">
              <div className="trend-icon stable">➡️</div>
              <div className="trend-content">
                <div className="trend-label">Stable</div>
                <div className="trend-count">{stableMarket}</div>
              </div>
            </div>
            
            <div className="trend-item">
              <div className="trend-icon declining">📉</div>
              <div className="trend-content">
                <div className="trend-label">Declining</div>
                <div className="trend-count">{decliningMarket}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="stats-section">
          <h3>🕒 Recent Activities</h3>
          <div className="recent-activities">
            {recentActivities.length > 0 ? (
              recentActivities.map(activity => (
                <div key={activity.id} className="recent-activity">
                  <div className="activity-date">{activity.date}</div>
                  <div className="activity-content">
                    <div className="activity-text">{activity.activity}</div>
                    <div className="activity-farm">📍 {activity.farmName}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activities">No recent activities</p>
            )}
          </div>
          <Link to="/activities" className="view-all-btn">View All Activities</Link>
        </div>
      </div>

      <div className="stats-actions">
        <Link to="/" className="back-btn">← Back to Dashboard</Link>
        <Link to="/my-farms" className="view-farms-btn">View My Farms</Link>
      </div>
    </div>
  )
}

export default Stats
