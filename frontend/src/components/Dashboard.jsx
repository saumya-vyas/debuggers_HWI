import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = ({ crops, activities }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Your Farmer Dashboard</h2>
        <p>Manage your crops and track your farming activities</p>
      </div>

      <div className="dashboard-grid">
        {/* New Crop Section */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>🌱 Add New Crop</h3>
            <div className="card-actions">
              <Link to="/add-crop" className="toggle-btn">
                Add Crop
              </Link>
            </div>
          </div>
          <p className="card-description">Add a new crop to your farming portfolio</p>
        </div>

        {/* 7-Day Activity Section */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 7-Day Activity</h3>
            <div className="card-actions">
              <Link to="/add-activity" className="toggle-btn">
                Add Activity
              </Link>
              <Link to="/activities" className="toggle-btn secondary">
                View All Activities
              </Link>
            </div>
          </div>
          
          <div className="activities-list">
            {activities.slice(0, 3).map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-date">{activity.date}</div>
                <div className="activity-content">
                  <div className="activity-text">{activity.activity}</div>
                  <div className="activity-farm">{activity.farmName}</div>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="no-activities">No activities recorded yet</p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📊 Quick Stats</h3>
            <Link to="/stats" className="toggle-btn">
              View Details
            </Link>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{crops.length}</div>
              <div className="stat-label">Total Farms</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{activities.length}</div>
              <div className="stat-label">Activities This Week</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{crops.filter(crop => crop.nutrientHealth === 'Excellent').length}</div>
              <div className="stat-label">Excellent Health</div>
            </div>
          </div>
        </div>

        {/* My Farms Button */}
        <div className="dashboard-card">
          <h3>🏡 My Farms</h3>
          <p>View and manage all your farms and crops</p>
          <Link to="/my-farms" className="my-farms-btn">
            View My Farms
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
