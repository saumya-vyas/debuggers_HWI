import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import MyFarms from './components/MyFarms'
import FarmDetails from './components/FarmDetails'
import Activities from './components/Activities'
import AddCrop from './components/AddCrop'
import AddActivity from './components/AddActivity'
import Stats from './components/Stats'
import { 
  getAllCrops, 
  addNewCrop, 
  getAllActivities, 
  addNewActivity,
  initializeStorage 
} from './storage'
import './App.css'

function App() {
  const [crops, setCrops] = useState([])
  const [activities, setActivities] = useState([])

  // Initialize storage and load data
  useEffect(() => {
    initializeStorage()
    setCrops(getAllCrops())
    setActivities(getAllActivities())
  }, [])

  const handleAddNewCrop = (newCrop) => {
    const addedCrop = addNewCrop(newCrop)
    setCrops(getAllCrops()) // Refresh crops from storage
    return addedCrop
  }

  const handleAddNewActivity = (newActivity) => {
    const addedActivity = addNewActivity(newActivity)
    setActivities(getAllActivities()) // Refresh activities from storage
    return addedActivity
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <h1>🌾 Farmer Portal</h1>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/my-farms" className="nav-link">My Farms</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  crops={crops}
                  activities={activities}
                />
              } 
            />
            <Route 
              path="/my-farms" 
              element={<MyFarms crops={crops} />} 
            />
            <Route 
              path="/activities" 
              element={<Activities activities={activities} />} 
            />
            <Route 
              path="/add-crop" 
              element={<AddCrop onAddCrop={handleAddNewCrop} />} 
            />
            <Route 
              path="/add-activity" 
              element={<AddActivity crops={crops} onAddActivity={handleAddNewActivity} />} 
            />
            <Route 
              path="/stats" 
              element={<Stats crops={crops} activities={activities} />} 
            />
            <Route 
              path="/farm/:id" 
              element={<FarmDetails crops={crops} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
