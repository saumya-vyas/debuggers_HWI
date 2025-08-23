import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AddActivity.css'

const AddActivity = ({ crops, onAddActivity }) => {
  const navigate = useNavigate()
  const [newActivity, setNewActivity] = useState({
    date: '',
    activity: '',
    farmName: ''
  })

  const today = new Date().toISOString().split('T')[0]

  const handleActivitySubmit = (e) => {
    e.preventDefault()
    onAddActivity(newActivity)
    setNewActivity({ date: '', activity: '', farmName: '' })
    navigate('/activities') // Navigate to Activities page after adding
  }

  return (
    <div className="add-activity-page">
      <div className="add-activity-header">
        <h2>📅 Add New Activity</h2>
        <p>Record a new farming activity</p>
      </div>

      <div className="add-activity-container">
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
              rows="4"
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
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">Add Activity</button>
            <Link to="/" className="cancel-btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddActivity
