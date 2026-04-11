import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#1a1a1a] border-b border-red-600/30 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Logo size fix: h-12 w-12 aur object-contain zaroori hai */}
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="h-12 w-12 rounded-full border border-red-600 object-contain bg-white" 
        />
        <span className="text-xl font-bold text-white tracking-tighter">
          MECH<span className="text-red-600">QUISH</span>
        </span>
      </div>
      
      {/* Links setup: flex-row aur gap-6 se line mein aayenge */}
      <div className="flex flex-row items-center gap-6 font-medium text-gray-300">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <Link to="/admin-dashboard" className="hover:text-red-600 transition-colors">Admin</Link>
        <Link to="/events" className="hover:text-red-600 transition-colors">Events</Link>
        <Link to="/gallery" className="hover:text-red-600 transition-colors">Gallery</Link>
        <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;