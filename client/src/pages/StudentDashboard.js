import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const fileInputRef = useRef(null);

  const [student, setStudent] = useState({
    name: "Loading...",
    email: "loading...",
    branch: "...",
    year: "...",
    studentClass: "...",
    role: "...",
    callsign: "Member", 
    profilePic: "/logo.png",
    eventsAttended: 0,
    credits: 0
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setStudent({
        name: storedUser.fullName || storedUser.name,
        email: storedUser.email,
        branch: storedUser.branch || "Not Specified",
        studentClass: storedUser.studentClass || "Not Specified",
        role: storedUser.role || "Student",
        year: storedUser.year === 1 ? "1st Year" : 
              storedUser.year === 2 ? "2nd Year" : 
              storedUser.year === 3 ? "3rd Year" : 
              storedUser.year === 4 ? "4th Year" : storedUser.year,
        callsign: "Member",
        profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${storedUser.fullName}&backgroundColor=e11d48`, // Premium Rose Red
        eventsAttended: 3, 
        credits: 150       
      });
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStudent({ ...student, profilePic: imageUrl });
    }
  };

  const handleEventRegistration = (eventName) => {
    alert(`Successfully registered for ${eventName}.`);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile settings saved successfully.");
  };

  // Smooth Animations
  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-200 font-sans flex overflow-hidden selection:bg-red-500/30">
      
      {/* SIDEBAR - Clean & Professional */}
      <aside className="w-72 bg-[#18181b] border-r border-white/5 flex flex-col z-20 shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="w-24 h-24 mb-4 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 blur-md opacity-40"></div>
            <img 
              src={student.profilePic} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-2 border-white/10 relative z-10 shadow-lg"
            />
          </motion.div>
          <h2 className="text-xl font-bold text-white tracking-tight">{student.name}</h2>
          <p className="text-sm text-gray-400 mt-1">{student.callsign}</p>
          <span className="mt-3 px-3 py-1 bg-red-500/10 text-red-500 text-[11px] font-bold uppercase tracking-wider rounded-full border border-red-500/20">
            {student.role}
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'DASHBOARD', label: 'My ID & Dashboard', icon: '💳' },
            { id: 'EVENTS', label: 'Club Events', icon: '🗓️' },
            { id: 'PROFILE', label: 'Profile Settings', icon: '⚙️' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
               <span className="text-lg">{item.icon}</span> 
               {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">

          <Link 
            to="/" 
            className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 text-sm font-medium rounded-xl transition-all duration-200 flex justify-center items-center gap-2 shadow-lg"
          >
            <span>🏠</span> Back to Home
          </Link>
          
          <button 
            onClick={handleLogout} 
            className="w-full py-3.5 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 text-sm font-medium rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
          >
            Logout Account
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-[#09090b] p-10 lg:p-14">
        
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {activeTab === 'DASHBOARD' && 'Student Dashboard'}
            {activeTab === 'EVENTS' && 'Upcoming Events'}
            {activeTab === 'PROFILE' && 'Profile Settings'}
          </h1>
          <p className="text-sm text-gray-500 mt-2">Welcome back to the MechQuish Member Portal.</p>
        </header>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: DASHBOARD & PREMIUM ID CARD */}
          {activeTab === 'DASHBOARD' && (
            <motion.div key="dashboard" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Premium ID Card */}
              <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-[#1e1e24] to-[#121217] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
                {/* Subtle Glow Effect */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-500"></div>
                
                <div className="relative z-10 flex-1 text-left w-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                      <img src="/logo.png" alt="Logo" className="w-6 h-6 invert brightness-0" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">MECHQUISH</h4>
                      <p className="text-[10px] text-red-400 font-medium tracking-widest uppercase">Official Member</p>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-1">{student.name}</h3>
                  <p className="text-sm text-gray-400 font-medium mb-6">{student.email}</p>
                  
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Branch</p>
                      <p className="text-sm text-gray-200 font-medium">{student.branch}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Class / Year</p>
                      <p className="text-sm text-gray-200 font-medium">{student.studentClass} • {student.year}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                  <QRCodeSVG 
                    value={JSON.stringify({ name: student.name, email: student.email, class: student.studentClass })}
                    size={130}
                    level="H"
                  />
                  <p className="text-[10px] text-center text-gray-600 mt-3 font-bold uppercase tracking-wider">Scan Card</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="col-span-1 space-y-6">
                <motion.div whileHover={{ y: -4 }} className="bg-[#18181b] border border-white/5 p-8 rounded-3xl shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 text-xl">🏆</div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Events Attended</p>
                  <p className="text-3xl font-bold text-white">{student.eventsAttended}</p>
                </motion.div>
                
                <motion.div whileHover={{ y: -4 }} className="bg-[#18181b] border border-white/5 p-8 rounded-3xl shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500 text-xl">⭐</div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Reward Credits</p>
                  <p className="text-3xl font-bold text-white">{student.credits}</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: EVENTS */}
          {activeTab === 'EVENTS' && (
            <motion.div key="events" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
              <div className="bg-[#18181b] border border-white/5 rounded-3xl p-8 shadow-xl">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#1f1f23] rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider rounded-md">Live</span>
                      <span className="text-gray-400 text-xs font-medium">Tomorrow • 2:00 PM</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">Drone Assembly Workshop</h4>
                    <p className="text-sm text-gray-500">Main Robotics Lab, Sector 4</p>
                  </div>
                  
                  <button 
                    onClick={() => handleEventRegistration("Drone Assembly Workshop")}
                    className="mt-4 md:mt-0 px-6 py-3 bg-white text-black hover:bg-gray-200 font-bold text-sm rounded-xl transition-all"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'PROFILE' && (
            <motion.div key="profile" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="max-w-4xl bg-[#18181b] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
              
              <form onSubmit={handleProfileUpdate} className="space-y-8">
                
                {/* Photo Update */}
                <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-white/5">
                  <img src={student.profilePic} alt="Avatar" className="w-24 h-24 rounded-full object-cover border border-white/10" />
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-white mb-2">Profile Picture</h3>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all">
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries({
                    "Full Name": { val: student.name, key: 'name', type: 'text', disabled: false },
                    "Email Address": { val: student.email, key: 'email', type: 'email', disabled: true },
                    "Branch": { val: student.branch, key: 'branch', type: 'text', disabled: false },
                    "Class & Section": { val: student.studentClass, key: 'studentClass', type: 'text', disabled: false },
                    "Account Role": { val: student.role, key: 'role', type: 'text', disabled: true },
                  }).map(([label, info]) => (
                    <div key={label} className="space-y-2">
                      <label className="text-xs font-medium text-gray-400">{label}</label>
                      <input 
                        type={info.type} 
                        value={info.val} 
                        disabled={info.disabled}
                        onChange={(e) => setStudent({...student, [info.key]: e.target.value})} 
                        className="w-full bg-[#1f1f23] border border-white/5 px-4 py-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                      />
                    </div>
                  ))}
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400">Display Tag</label>
                    <select 
                      value={student.callsign} 
                      onChange={(e) => setStudent({...student, callsign: e.target.value})} 
                      className="w-full bg-[#1f1f23] border border-white/5 px-4 py-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Member">Member</option>
                      <option value="Core Team">Core Team</option>
                      <option value="Tech Lead">Tech Lead</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-600/20">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StudentDashboard;