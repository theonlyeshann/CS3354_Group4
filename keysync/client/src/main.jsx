import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage.jsx'
import Dashboard from './pages/dashboard.jsx'
import CreateAccPage from './pages/createacc.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<Dashboard />} />
        <Route path="/createacc" element={<CreateAccPage />} />
        <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
)