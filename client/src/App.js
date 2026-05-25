import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 👈 Yahan Navigate add kiya hai
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Developers from './pages/Developers';

// 🛡️ SECURITY GUARD FUNCTION (Bouncer)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  
  if (!token) {
    // If you don't have a token, redirect to the login page.
    return <Navigate to="/login" replace />; 
  }

  // If you have a token, let them in.
  return children; 
};

function App() {
  return (
    <Router>
      {/* Main container  */}
      <div className="min-h-screen bg-[#121212] text-white">
        
        <Navbar /> 

        <Routes>
          {/* 🟢 PUBLIC ROUTES*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/developers" element={<Developers />} />
          
          {/* 🔴 PROTECTED ROUTES */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;