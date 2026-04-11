// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen relative bg-[#050505] overflow-hidden">
      {/* 1. BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0">
        {/* Animated Red Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600/10 border border-red-600/30 text-red-500 px-4 py-1 rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-8"
        >
          Established 2026 // Innovation Hub
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 font-tech"
        >
          MECH<span className="text-red-600">QUISH</span><br/>
          <span className="text-4xl md:text-6xl text-gray-400 italic">CLUB_PORTAL</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl text-gray-500 text-lg md:text-xl leading-relaxed mb-12 font-sans"
        >
          Innovation | Engineering | Excellence. The ultimate platform for 
          mechanical engineers to create, innovate, and lead the future of technology.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Link 
            to="/login" 
            className="px-10 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Access Dashboard
          </Link>
          <Link 
            to="/events" 
            className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm backdrop-blur-md"
          >
            Explore Events
          </Link>
        </motion.div>
      </div>

      {/* 3. FEATURE CARDS SECTION (Short Look) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        {[
          { title: "Design", desc: "Advanced CAD & Industrial Modeling" },
          { title: "Robotics", desc: "Automated Systems & AI Integration" },
          { title: "Workshop", desc: "Hands-on Engineering Excellence" }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + (index * 0.1) }}
            className="p-8 bg-[#0d0d0d] border border-white/5 rounded-2xl hover:border-red-600/50 transition-all group cursor-default"
          >
            <h3 className="text-red-600 font-tech font-bold text-xl mb-2 uppercase">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;