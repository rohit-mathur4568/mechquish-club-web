import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  // --- STATE FOR LIVE DATABASE DATA ---
  const [faculty, setFaculty] = useState([]);
  const [coreTeam, setCoreTeam] = useState([]);

  // --- FETCH DATA FROM MONGODB ---
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members/all');
        const allMembers = response.data;
        
        // Filter and separate data based on category
        const mentorsList = allMembers.filter(m => m?.category?.includes('Faculty'));
        const coreTeamList = allMembers.filter(m => m?.category?.includes('Core'));
        
        setFaculty(mentorsList);
        setCoreTeam(coreTeamList);
      } catch (error) {
        console.error("Error fetching live team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  const domains = [
    { title: "Software & Web3", icon: "💻", desc: "Building scalable apps, decentralized networks, and the future of the web." },
    { title: "Robotics & IoT", icon: "🤖", desc: "Automating the physical world with embedded systems and intelligent hardware." },
    { title: "AI & Data Science", icon: "🧠", desc: "Training models, analyzing data, and integrating machine learning." },
    { title: "UI/UX & Design", icon: "🎨", desc: "Crafting beautiful, intuitive, and user-centric digital experiences." }
  ];

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans overflow-x-hidden selection:bg-red-500/30">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-10">
        
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#05050a] to-[#05050a]"></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} 
            className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.3em] mb-8 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
          >
            The Ultimate Innovation Hub
          </motion.div>
          
          <motion.h1 
            animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4"
          >
            <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#ffffff,#888888,#ffffff)] bg-[length:200%_auto] animate-[gradientMove_3s_linear_infinite]">MECH</span>
            <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">QUISH</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} 
            className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-12 font-medium"
          >
            Innovate. Build. Conquer. Where brilliant minds from all disciplines unite to engineer the future.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Link to="/register" className="px-10 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:-translate-y-1">
              Join the Revolution
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-red-900/50 to-transparent relative overflow-hidden">
            <motion.div animate={{ y: [-40, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.8)]"/>
          </div>
        </div>
      </section>

      {/* ================= LIVE STATS TICKER ================= */}
      <div className="w-full bg-[#12121a] border-y border-white/5 py-4 overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] items-center gap-12 text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">
           <span>🚀 500+ Active Members</span><span>•</span>
           <span className="text-red-500">🏆 15+ Hackathons Won</span><span>•</span>
           <span>💻 50+ Live Projects</span><span>•</span>
           <span>👨‍🏫 Top Faculty Mentorship</span><span>•</span>
           <span className="text-red-500">🛸 Advanced Tech Hub</span><span>•</span>
           
           <span>🚀 500+ Active Members</span><span>•</span>
           <span className="text-red-500">🏆 15+ Hackathons Won</span><span>•</span>
           <span>💻 50+ Live Projects</span><span>•</span>
           <span>👨‍🏫 Top Faculty Mentorship</span><span>•</span>
           <span className="text-red-500">🛸 Advanced Tech Hub</span>
        </div>
      </div>

      {/* ================= LIVE FACULTY BOARD ================= */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Our <span className="text-red-500">Mentors</span></h2>
          <p className="text-gray-400">Guided by the best minds in the institution.</p>
        </div>
        
        {faculty.length === 0 ? (
           <p className="text-center text-gray-500 italic">Faculty data is loading or database is empty...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((teacher, index) => (
              <motion.div whileHover={{ y: -5 }} key={teacher._id || index} className="bg-[#0a0a0f] border border-white/5 hover:border-red-500/30 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all">
                <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center text-3xl shadow-inner overflow-hidden border border-white/10">
                   {teacher.image && teacher.image.length > 5 ? (
                      <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                   ) : (
                      "👨‍🏫"
                   )}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
                <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mb-3 px-3 py-1 bg-red-500/10 rounded-full">{teacher.role}</p>
                <p className="text-sm text-gray-500 italic">"{teacher.description || "Guiding innovation and excellence."}"</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= LIVE CORE TEAM SLIDER ================= */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-[#05050a] to-[#0a0a0f] border-t border-white/5">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">The <span className="text-red-500">Core Engine</span></h2>
          <p className="text-gray-400">The dynamic team driving MechQuish forward.</p>
        </div>

        {coreTeam.length === 0 ? (
           <p className="text-center text-gray-500 italic">Core team data is loading or database is empty...</p>
        ) : (
          <div className="flex overflow-x-auto gap-6 px-10 pb-10 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {coreTeam.map((member, index) => (
              <motion.div whileHover={{ y: -10 }} key={member._id || index} className="min-w-[260px] snap-center bg-[#12121a] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:border-red-500/40 hover:shadow-red-500/10 transition-all group">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-red-600 to-red-900 p-1">
                  <div className="w-full h-full bg-[#12121a] rounded-full overflow-hidden flex items-center justify-center text-3xl font-black text-white">
                    {member.image && member.image.length > 5 ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        member.name.charAt(0)
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">{member.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold px-3 py-1 bg-white/5 rounded-full mt-2">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= TECH DOMAINS ================= */}
      <section id="domains" className="py-24 px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Our <span className="text-red-500">Domains</span></h2>
          <p className="text-gray-400">We don't just study technology, we build it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <motion.div whileHover={{ scale: 1.05 }} key={index} className="bg-[#12121a] border border-white/5 p-8 rounded-3xl hover:bg-white/5 hover:border-white/20 transition-all cursor-default">
              <div className="text-5xl mb-6 bg-white/5 inline-block p-4 rounded-2xl">{domain.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{domain.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{domain.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradientMove {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

    </div>
  );
};

export default Home;