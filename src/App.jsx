import React from 'react'
import AdminDashboard from './pages/AdminDashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MatchesPage from './pages/MatchesPage'
import './index.css'
import Server1room1 from './pages/Server1room1'
const App = () => {
  return (
    <div>
     
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path='/server1-room1' element={<Server1room1/>}/>
        </Routes>
    </div>
  )
}

export default App
