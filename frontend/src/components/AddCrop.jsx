import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AddCrop.css'

const AddCrop = ({ onAddCrop }) => {
  const navigate = useNavigate()
  const [newCrop, setNewCrop] = useState({
    farmName: '',
    location: '',
    cropType: '',
    sowingDate: ''
  })

  const handleCropSubmit = (e) => {
    e.preventDefault()
    onAddCrop(newCrop)
    setNewCrop({ farmName: '', location: '', cropType: '', sowingDate: '' })
    navigate('/my-farms') // Navigate to My Farms after adding
  }

  return (
    <div className="add-crop-page">
      <div className="add-crop-header">
        <h2>🌱 Add New Crop</h2>
        <p>Add a new crop to your farming portfolio</p>
      </div>

      <div className="add-crop-container">
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
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">Add Crop</button>
            <Link to="/" className="cancel-btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCrop
