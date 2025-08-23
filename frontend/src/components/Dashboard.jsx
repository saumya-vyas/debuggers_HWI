import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = ({ crops, activities, onAddCrop, onAddActivity }) => {
  const [showNewCropForm, setShowNewCropForm] = useState(false)
  const [showNewActivityForm, setShowNewActivityForm] = useState(false)
  const [newCrop, setNewCrop] = useState({
    farmName: '',
    location: '',
    cropType: '',
    sowingDate: ''
  })
  const [newActivity, setNewActivity] = useState({
    date: '',
    activity: '',
    farmName: ''
  })

  const handleCropSubmit = (e) => {
    e.preventDefault()
    onAddCrop(newCrop)
    setNewCrop({ farmName: '', location: '', cropType: '', sowingDate: '' })
    setShowNewCropForm(false)
  }

  const handleActivitySubmit = (e) => {
    e.preventDefault()
    onAddActivity(newActivity)
    setNewActivity({ date: '', activity: '', farmName: '' })
    setShowNewActivityForm(false)
  }

  const today = new Date().toISOString().split('T')[0]

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
            <button 
              className="toggle-btn"
              onClick={() => setShowNewCropForm(!showNewCropForm)}
            >
              {showNewCropForm ? 'Cancel' : 'Add Crop'}
            </button>
          </div>
          
          {showNewCropForm && (
            <form onSubmit={handleCropSubmit} className="crop-form">
              <div className="form-group">
                <label htmlFor="farmName">Farm Name:</label>
                <input
                  type="text"
                  id="farmName"
                  value={newCrop.farmName}
                  onChange={(e) => setNewCrop({...newCrop, farmName: e.target.value})}
                  required
                  placeholder="Enter farm name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  value={newCrop.location}
                  onChange={(e) => setNewCrop({...newCrop, location: e.target.value})}
                  required
                  placeholder="Enter farm location"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cropType">Crop Type:</label>
                <input
                  type="text"
                  id="cropType"
                  value={newCrop.cropType}
                  onChange={(e) => setNewCrop({...newCrop, cropType: e.target.value})}
                  required
                  placeholder="Enter crop type"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sowingDate">Date of Sowing:</label>
                <input
                  type="date"
                  id="sowingDate"
                  value={newCrop.sowingDate}
                  onChange={(e) => setNewCrop({...newCrop, sowingDate: e.target.value})}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">Add Crop</button>
            </form>
          )}
        </div>

        {/* 7-Day Activity Section */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 7-Day Activity</h3>
            <button 
              className="toggle-btn"
              onClick={() => setShowNewActivityForm(!showNewActivityForm)}
            >
              {showNewActivityForm ? 'Cancel' : 'Add Activity'}
            </button>
          </div>
          
          {showNewActivityForm && (
            <form onSubmit={handleActivitySubmit} className="activity-form">
              <div className="form-group">
                <label htmlFor="activityDate">Date:</label>
                <input
                  type="date"
                  id="activityDate"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                  required
                  max={today}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="activityDescription">Activity:</label>
                <textarea
                  id="activityDescription"
                  value={newActivity.activity}
                  onChange={(e) => setNewActivity({...newActivity, activity: e.target.value})}
                  required
                  placeholder="Describe the activity"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="activityFarm">Farm Name:</label>
                <select
                  id="activityFarm"
                  value={newActivity.farmName}
                  onChange={(e) => setNewActivity({...newActivity, farmName: e.target.value})}
                  required
                >
                  <option value="">Select a farm</option>
                  {crops.map(crop => (
                    <option key={crop.id} value={crop.farmName}>
                      {crop.farmName}
                    </option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="submit-btn">Add Activity</button>
            </form>
          )}
          
          <div className="activities-list">
            {activities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-date">{activity.date}</div>
                <div className="activity-content">
                  <div className="activity-text">{activity.activity}</div>
                  <div className="activity-farm">{activity.farmName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card">
          <h3>📊 Quick Stats</h3>
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
