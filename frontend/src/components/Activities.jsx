import { Link } from 'react-router-dom'
import './Activities.css'

const Activities = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="activities-page">
        <div className="activities-header">
          <h2>📅 All Activities</h2>
          <p>No activities recorded yet. Start by adding your first activity!</p>
          <Link to="/" className="add-first-activity-btn">
            Add Your First Activity
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="activities-page">
      <div className="activities-header">
        <h2>📅 All Activities</h2>
        <p>Track all your farming activities and progress</p>
        <Link to="/" className="add-new-activity-btn">
          + Add New Activity
        </Link>
      </div>

      <div className="activities-container">
        {activities.map(activity => (
          <div key={activity.id} className="activity-card">
            <div className="activity-date-badge">
              {activity.date}
            </div>
            <div className="activity-content">
              <h3 className="activity-title">{activity.activity}</h3>
              <p className="activity-farm">📍 {activity.farmName}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="activities-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{activities.length}</div>
            <div className="stat-label">Total Activities</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">
              {activities.filter(activity => {
                const activityDate = new Date(activity.date)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return activityDate >= weekAgo
              }).length}
            </div>
            <div className="stat-label">This Week</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏡</div>
          <div className="stat-content">
            <div className="stat-number">
              {new Set(activities.map(activity => activity.farmName)).size}
            </div>
            <div className="stat-label">Farms Involved</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities
