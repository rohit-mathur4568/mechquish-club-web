import React from 'react';
import { motion } from 'framer-motion';

const Developers = () => {
  // Developer Team Data with specific contributions
  const team = [
    {
      name: "Rohit Mathur",
      role: "Full Stack Architect",
      aka: "The Backend Brain",
      img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohit&backgroundColor=dc2626",
      theme: { 
        gradient: "from-red-600 to-red-900", 
        glowBg: "from-red-600/40 to-transparent", 
        border: "group-hover:border-red-500", 
        text: "text-red-500", 
        shadow: "hover:shadow-[0_10px_40px_rgba(220,38,38,0.2)]", 
        ring: "group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
      },
      bio: "Designed the core architecture of the MechQuish portal. Handles the invisible magic that makes everything run securely.",
      contributions: [
        "MongoDB Database Architecture",
        "Node.js & Express API Routes",
        "JWT Security & User Authentication"
      ]
    },
    {
      name: "Anjali Tiwari",
      role: "Technical Lead",
      aka: "The Logic Gatekeeper",
      img: "https://api.dicebear.com/7.x/notionists/svg?seed=Anjali&backgroundColor=6366f1",
      theme: { 
        gradient: "from-indigo-600 to-indigo-900", 
        glowBg: "from-indigo-600/40 to-transparent", 
        border: "group-hover:border-indigo-500", 
        text: "text-indigo-400", 
        shadow: "hover:shadow-[0_10px_40px_rgba(79,70,229,0.2)]", 
        ring: "group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]" 
      },
      bio: "Bridges the gap between data and design. Ensures the frontend communicates flawlessly with the backend servers.",
      contributions: [
        "React State Management & Routing",
        "API Integration & Data Fetching",
        "System Logic & Dynamic Rendering"
      ]
    },
    {
      name: "Shristi Raghav",
      role: "UI/UX & Animation",
      aka: "The Pixel Master",
      img: "https://api.dicebear.com/7.x/notionists/svg?seed=Shristi&backgroundColor=d946ef",
      theme: { 
        gradient: "from-fuchsia-600 to-fuchsia-900", 
        glowBg: "from-fuchsia-600/40 to-transparent", 
        border: "group-hover:border-fuchsia-500", 
        text: "text-fuchsia-400", 
        shadow: "hover:shadow-[0_10px_40px_rgba(217,70,239,0.2)]", 
        ring: "group-hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]" 
      },
      bio: "Crafts the visual experience. Turns boring code into beautiful, futuristic, and interactive user interfaces.",
      contributions: [
        "Tailwind CSS Glassmorphism UI",
        "Framer Motion Animations",
        "Responsive & Cyber-Tech Design"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans overflow-x-hidden selection:bg-red-500/30 pt-24 pb-12 relative">
      
      {/* Lag-Free Static Background Orb (Using Radial Gradient instead of Blur) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(153,27,27,0.15)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            System Creators
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
          >
            Meet the <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-indigo-500">Architects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            The dedicated team of developers who engineered the MechQuish platform from scratch. 
          </motion.p>
        </div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((dev, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              whileHover={{ y: -10 }}
              className={`bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 ${dev.theme.border} rounded-[2rem] p-8 shadow-2xl ${dev.theme.shadow} transition-all duration-300 group relative overflow-hidden transform-gpu`}
            >
              {/* No-Lag Card Glow Background (Radial Gradient) */}
              <div className={`absolute -top-20 -right-20 w-64 h-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${dev.theme.glowBg} rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`}></div>

              {/* Profile Image (Big Size is Back!) */}
              <div className="relative w-24 h-24 mb-6">
                <div className={`absolute inset-0 rounded-full border border-white/20 scale-110 group-hover:scale-125 transition-transform duration-500 ${dev.theme.ring}`}></div>
                <img src={dev.img} alt={dev.name} className="relative z-10 w-full h-full rounded-full object-cover border-2 border-[#0a0a0f] shadow-xl transition-all" />
                <div className={`absolute bottom-0 right-0 z-20 w-6 h-6 rounded-full bg-gradient-to-br ${dev.theme.gradient} border-2 border-[#0a0a0f] flex items-center justify-center shadow-lg`}>
                  <span className="text-[10px]">⚡</span>
                </div>
              </div>

              {/* Name & Role */}
              <h2 className="text-2xl font-bold text-white mb-1 relative z-10">{dev.name}</h2>
              <h3 className={`text-xs font-black uppercase tracking-widest ${dev.theme.text} mb-2 relative z-10`}>{dev.role}</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-6 relative z-10">AKA: "{dev.aka}"</p>

              <p className="text-sm text-gray-400 mb-8 line-clamp-3 relative z-10">
                {dev.bio}
              </p>

              {/* Contributions Section */}
              <div className="border-t border-white/10 pt-6 relative z-10">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">Key Contributions</p>
                <ul className="space-y-3">
                  {dev.contributions.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${dev.theme.gradient} shrink-0 shadow-lg`}></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Arsenal Section */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
          className="mt-32 text-center border-t border-white/10 pt-16"
        >
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-8">The Tech Arsenal Used</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Framer Motion'].map((tech, i) => (
              <span key={i} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default shadow-lg hover:-translate-y-1">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Developers;