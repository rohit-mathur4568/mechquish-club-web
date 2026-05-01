import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const location = useLocation(); 
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect logic (Navbar becomes glassmorphic on scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' }
  ];

  // Developer Team Data
  const developers = [
    { name: "Rohit Mathur", role: "Full Stack Architect", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohit&backgroundColor=dc2626" },
    { name: "Anjali Tiwari", role: "Technical Lead", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Anjali&backgroundColor=6366f1" },
    { name: "Shristi Raghav", role: "UI/UX & Logic", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Shristi&backgroundColor=d946ef" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#05050a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent py-6'
      } px-6 md:px-12 flex justify-between items-center`}
    >
      {/* ================= LOGO ================= */}
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-red-600/50 object-contain bg-white group-hover:border-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]" 
          />
        </motion.div>
        <span className="text-xl md:text-2xl font-black text-white tracking-tighter">
          MECH<span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">QUISH</span>
        </span>
      </Link>
      
      {/* ================= LINKS & BUTTONS ================= */}
      <div className="flex flex-row items-center gap-6 md:gap-10">
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="relative text-gray-300 hover:text-white transition-colors group py-2"
            >
              {link.name}
              <span className={`absolute left-0 bottom-0 h-[2px] bg-red-600 transition-all duration-300 ${
                location.pathname === link.path ? 'w-full shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        {/* --- DEVS DROPDOWN (The VIP Flex 💪) --- */}
        <div className="relative group hidden sm:flex items-center cursor-pointer">
          <Link to="/developers" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
    <span className="text-lg">💻</span>
    <span>Dev Team</span>
  </Link>
          
          {/* Glowing Glass Card (Shows on Hover) */}
          <div className="absolute top-full right-0 mt-6 w-72 bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 shadow-[0_10px_40px_rgba(220,38,38,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
            {/* Pointer arrow top right */}
            <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0a0a0f] border-t border-l border-white/10 transform rotate-45"></div>
            
            <p className="text-[10px] text-red-500 font-black tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
              Architects of MechQuish
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </p>
            
            <div className="flex flex-col gap-4">
              {developers.map((dev, index) => (
                <div key={index} className="flex items-center gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors">
                  <img 
                    src={dev.img} 
                    alt={dev.name} 
                    className="w-10 h-10 rounded-full border border-white/20 shadow-lg object-cover" 
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-bold">{dev.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{dev.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-white/20 hidden md:block"></div>

        {/* ================= LOGIN / DASHBOARD BUTTON ================= */}
        {loggedInUser ? (
          <Link 
            to={loggedInUser.role === 'Admin' ? "/admin-dashboard" : "/student-dashboard"} 
            className="relative overflow-hidden px-6 py-2.5 rounded-full bg-red-600/10 text-red-500 font-bold text-sm tracking-wide border border-red-600/50 hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] group"
          >
            <span className="relative z-10">Dashboard</span>
            <div className="absolute inset-0 w-full h-full bg-red-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="relative overflow-hidden px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm tracking-wide hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:-translate-y-0.5"
          >
            System Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;