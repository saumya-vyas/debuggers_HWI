import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ crops, activities }) => {
  // Dummy data for analytics sections
  const weatherData = {
    current: { temp: 24, humidity: 65, wind: 12, condition: 'Sunny' },
    forecast: [
      { day: 'Mon', temp: 22, condition: 'Cloudy' },
      { day: 'Tue', temp: 26, condition: 'Sunny' },
      { day: 'Wed', temp: 25, condition: 'Partly Cloudy' },
      { day: 'Thu', temp: 23, condition: 'Rainy' },
      { day: 'Fri', temp: 27, condition: 'Sunny' },
      { day: 'Sat', temp: 28, condition: 'Sunny' },
      { day: 'Sun', temp: 26, condition: 'Cloudy' }
    ]
  };

  const ndviData = [
    { date: '2024-03-14', value: 0.65 },
    { date: '2024-03-15', value: 0.68 },
    { date: '2024-03-16', value: 0.72 },
    { date: '2024-03-17', value: 0.70 },
    { date: '2024-03-18', value: 0.75 },
    { date: '2024-03-19', value: 0.78 },
    { date: '2024-03-20', value: 0.82 }
  ];

  const marketTrends = [
    { crop: 'Wheat', price: 280, change: '+5.2%' },
    { crop: 'Corn', price: 195, change: '-2.1%' },
    { crop: 'Soybeans', price: 420, change: '+3.8%' },
    { crop: 'Rice', price: 380, change: '+1.5%' }
  ];

  const improvementAreas = [
    { area: 'Soil pH', status: 'Needs attention', priority: 'High' },
    { area: 'Water Management', status: 'Good', priority: 'Medium' },
    { area: 'Pest Control', status: 'Excellent', priority: 'Low' },
    { area: 'Fertilization', status: 'Needs improvement', priority: 'High' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Your Farmer Dashboard</h2>
        <p>Manage your crops and track your farming activities</p>
      </div>

      {/* Main Dashboard Cards */}
      <div className="dashboard-grid">
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

        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 7-Day Activity</h3>
            <div className="card-actions">
              <Link to="/add-activity" className="toggle-btn">
                Add Activity
              </Link>
              <Link to="/activities" className="toggle-btn secondary">
                View All
              </Link>
            </div>
          </div>
          <div className="activities-list">
            {activities && activities.length > 0 ? (
              activities.slice(0, 3).map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-date">{activity.date}</span>
                  <div className="activity-content">
                    <div className="activity-text">{activity.description}</div>
                    <div className="activity-farm">{activity.farm}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activities">No activities recorded yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>📊 Quick Stats</h3>
            <div className="card-actions">
              <Link to="/stats" className="toggle-btn">
                View Details
              </Link>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{crops ? crops.length : 0}</div>
              <div className="stat-label">Total Farms</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{activities ? activities.length : 0}</div>
              <div className="stat-label">Activities This Week</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Excellent Health</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>🏡 My Farms</h3>
          </div>
          <p className="card-description">View and manage all your farms and crops</p>
          <Link to="/my-farms" className="my-farms-btn">
            View My Farms
          </Link>
        </div>
      </div>

      {/* Analytics Sections */}
      <div className="analytics-section">
        <h3 className="section-title">📈 Farm Analytics & Insights</h3>
        
        <div className="analytics-grid">
          {/* Weather Report */}
          <div className="analytics-card weather-card">
            <div className="card-header">
              <h3>🌤️ Weather Report</h3>
              <span className="current-temp">{weatherData.current.temp}°C</span>
            </div>
            <div className="weather-content">
              <div className="current-weather">
                <div className="weather-info">
                  <span>Humidity: {weatherData.current.humidity}%</span>
                  <span>Wind: {weatherData.current.wind} km/h</span>
                  <span>Condition: {weatherData.current.condition}</span>
                </div>
              </div>
              <div className="weather-forecast">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <span className="day">{day.day}</span>
                    <span className="temp">{day.temp}°</span>
                    <span className="condition">{day.condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NDVI Health Index */}
          <div className="analytics-card ndvi-card">
            <div className="card-header">
              <h3>🟢 NDVI Health Index</h3>
              <span className="ndvi-score">{ndviData[ndviData.length - 1].value}</span>
            </div>
            <div className="ndvi-content">
              <div className="ndvi-chart">
                {ndviData.map((point, index) => (
                  <div key={index} className="ndvi-point" style={{
                    height: `${point.value * 100}%`,
                    left: `${(index / (ndviData.length - 1)) * 100}%`
                  }}>
                    <span className="ndvi-tooltip">{point.value}</span>
                  </div>
                ))}
              </div>
              <div className="ndvi-labels">
                {ndviData.map((point, index) => (
                  <span key={index} className="ndvi-label">{point.date.slice(-2)}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="analytics-card market-card">
            <div className="card-header">
              <h3>📈 Market Trends</h3>
              <span className="market-update">Live</span>
            </div>
            <div className="market-content">
              {marketTrends.map((item, index) => (
                <div key={index} className="market-item">
                  <div className="market-crop">
                    <span className="crop-name">{item.crop}</span>
                    <span className="crop-price">₹{item.price}/quintal</span>
                  </div>
                  <span className={`market-change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Areas */}
          <div className="analytics-card improvement-card">
            <div className="card-header">
              <h3>🎯 Improvement Areas</h3>
              <span className="priority-count">2 High Priority</span>
            </div>
            <div className="improvement-content">
              {improvementAreas.map((area, index) => (
                <div key={index} className="improvement-item">
                  <div className="improvement-info">
                    <span className="area-name">{area.area}</span>
                    <span className="area-status">{area.status}</span>
                  </div>
                  <span className={`priority-badge ${area.priority.toLowerCase()}`}>
                    {area.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
