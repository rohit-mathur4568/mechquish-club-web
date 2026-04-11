import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      {/* Main container  */}
      <div className="min-h-screen bg-[#121212] text-white">
        
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Route - We will later protect this with Auth logic */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;