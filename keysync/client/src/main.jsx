import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginpage.jsx'
import DashboardPage from './pages/dashboardpage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {<DashboardPage />}

    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
)