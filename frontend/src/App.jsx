import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import WeatherDemo from './weather/WeatherDemo'
import Dashboard from './components/Dashboard'
import MyFarms from './components/MyFarms'
import FarmDetails from './components/FarmDetails'
import FarmingChat from './components/FarmingChat'
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
            <h1>🌾 AgroMantri</h1>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/my-farms" className="nav-link">My Farms</Link>
            <Link to="/farming-chat" className="nav-link">AI Chat</Link>
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
                  onAddCrop={handleAddNewCrop}
                  onAddActivity={handleAddNewActivity}
                />
              } 
            />
            <Route 
              path="/my-farms" 
              element={<MyFarms crops={crops} />} 
            />
            <Route 
              path="/farm/:id" 
              element={<FarmDetails crops={crops} />} 
            />
            <Route 
              path="/farming-chat" 
              element={<FarmingChat />} 
            />
          </Routes>
        </main>        
        {/* Global Footer - Available across all components */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>🌾 AgroMantri</h4>
              <p>Your comprehensive digital farming companion</p>
              <p>Powered by AI technology and farming expertise</p>
            </div>
            
            <div className="footer-section">
              <h4>🚀 Features</h4>
              <ul>
                <li>Crop Management</li>
                <li>AI-Powered Chat</li>
                <li>Activity Tracking</li>
                <li>Farm Analytics</li>
                <li>Weather Integration</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>📚 Resources</h4>
              <ul>
                <li>Farming Guides</li>
                <li>Best Practices</li>
                <li>Expert Advice</li>
                <li>Community Support</li>
                <li>Latest Updates</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>🔗 Quick Links</h4>
              <ul>
                <li><a href="/" className="footer-link">Dashboard</a></li>
                <li><a href="/my-farms" className="footer-link">My Farms</a></li>
                <li><a href="/farming-chat" className="footer-link">AI Chat</a></li>
                <li><a href="#" className="footer-link">Help Center</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>📞 Contact & Support</h4>
              <p>Need help? We're here for you!</p>
              <p>📧 support@farmerportal.com</p>
              <p>📱 +91 98765 43210</p>
              <p>🕒 Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>&copy; 2024 AgroMantri. All rights reserved.</p>
                <p>Built with ❤️ for Indian Farmers</p>
              </div>
              
              <div className="footer-social">
                <h5>Follow Us</h5>
                <div className="social-links">
                  <a href="#" className="social-link" title="Facebook">📘</a>
                  <a href="#" className="social-link" title="Twitter">🐦</a>
                  <a href="#" className="social-link" title="Instagram">📷</a>
                  <a href="#" className="social-link" title="YouTube">📺</a>
                </div>
              </div>
              
              <div className="footer-legal">
                <a href="#" className="legal-link">Privacy Policy</a>
                <a href="#" className="legal-link">Terms of Service</a>
                <a href="#" className="legal-link">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App