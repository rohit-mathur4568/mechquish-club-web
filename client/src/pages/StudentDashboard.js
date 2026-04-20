import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ACCESS_PASS');
  
  // Reference for the hidden file input used for profile photo uploads
  const fileInputRef = useRef(null);

  // Mock student data to be replaced with backend API fetch later
  const [student, setStudent] = useState({
    name: "Rahul Sharma",
    email: "student@college.com",
    branch: "Mechanical Engineering",
    year: "2nd Year",
    callsign: "GearHead", 
    profilePic: "https://api.dicebear.com/7.x/initials/svg?seed=Rahul+Sharma&backgroundColor=0284c7", 
    eventsAttended: 3,
    credits: 150
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setStudent(prev => ({
        ...prev,
        name: storedUser.fullName || storedUser.name, // Asli naam set ho jayega
        profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${storedUser.fullName}&backgroundColor=0284c7` // Photo bhi tere naam ki aayegi
      }));
    }
  }, []);

  // Secure logout logic clearing local storage
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to securely log out?")) {
      localStorage.clear();
      navigate('/login');
    }
  };

  // Logic to handle photo upload and generate a temporary preview URL
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStudent({ ...student, profilePic: imageUrl });
      alert("Profile photo updated successfully!");
    }
  };

  // Logic to handle event registration requests
  const handleEventRegistration = (eventName) => {
    // Axios POST request to backend will be implemented here
    alert(`Registration Successful for ${eventName}!\nYour QR code will now grant you entry to this event.`);
  };

  // Logic to handle profile data submission
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile Information Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#121212] border-r border-white/5 flex flex-col z-20 shadow-xl">
        <div className="p-8 border-b border-white/5 text-center">
          <img 
            src={student.profilePic} 
            alt="Profile" 
            className="w-20 h-20 mx-auto rounded-full object-cover border border-gray-700 shadow-md mb-4"
          />
          <h2 className="text-base font-bold text-white">{student.name}</h2>
          <p className="text-xs text-sky-500 font-medium mt-1">{student.callsign}</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'ACCESS_PASS', label: 'Student ID & QR', icon: '🎫' },
            { id: 'EVENTS', label: 'Club Events', icon: '📅' },
            { id: 'PROFILE', label: 'Profile Settings', icon: '⚙️' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
               <span className="text-xl">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout} 
            className="w-full py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 text-sm font-medium rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-10">
        
        <header className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {activeTab === 'ACCESS_PASS' && 'Dashboard Overview'}
            {activeTab === 'EVENTS' && 'Event Registrations'}
            {activeTab === 'PROFILE' && 'Account Settings'}
          </h1>
          <p className="text-sm text-gray-400 mt-2">Manage your MechQuish club activities and identity.</p>
        </header>

        {/* Tab 1: Access Pass and QR Code */}
        {activeTab === 'ACCESS_PASS' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Virtual ID Card Section */}
            <div className="col-span-1 lg:col-span-2 bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-900/20 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 flex-1 text-left">
                <p className="text-xs text-sky-500 font-semibold uppercase tracking-wider mb-2">MechQuish Official ID</p>
                <h3 className="text-3xl font-bold text-white mb-1">{student.name}</h3>
                <p className="text-sm text-gray-300">{student.branch}</p>
                <p className="text-sm text-gray-400 mb-6">{student.year}</p>
                
                <span className="px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-md text-sky-400 text-xs font-medium">
                  {student.callsign}
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-inner">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <QRCodeSVG 
                    value={JSON.stringify({ name: student.name, email: student.email, callsign: student.callsign })}
                    size={150}
                    level="H"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4 font-medium">Scan at entry points</p>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="col-span-1 space-y-6">
              <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-400 font-medium mb-2">Events Attended</p>
                <p className="text-4xl font-bold text-white">{student.eventsAttended}</p>
              </div>
              <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-400 font-medium mb-2">Total Credits</p>
                <p className="text-4xl font-bold text-yellow-500">{student.credits}</p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Live Event Registrations */}
        {activeTab === 'EVENTS' && (
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-6">Upcoming Club Events</h3>
            
            <div className="border border-white/5 p-6 rounded-xl bg-[#1a1a1a] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-sky-500/30 transition-all">
              <div>
                <h4 className="text-white font-bold text-lg">Drone Assembly Workshop v2.0</h4>
                <p className="text-sm text-gray-400 mt-1">Location: Main Lab | Date: Tomorrow, 2:00 PM</p>
              </div>
              
              <button 
                onClick={() => handleEventRegistration("Drone Assembly Workshop v2.0")}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
              >
                Register Now
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Profile Settings Form */}
        {activeTab === 'PROFILE' && (
          <div className="max-w-3xl bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-8">Personal Information</h3>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              
              {/* Avatar Section utilizing the hidden file input */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                <img src={student.profilePic} alt="Avatar" className="w-24 h-24 rounded-full object-cover border border-gray-700" />
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Profile Photo</p>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handlePhotoUpload} 
                    className="hidden" 
                  />
                  
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Upload New Image
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Recommended size: 256x256px.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <input type="text" value={student.name} onChange={(e) => setStudent({...student, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-2.5 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Registered Email</label>
                  <input type="email" value={student.email} disabled className="w-full bg-[#1a1a1a]/50 border border-white/5 px-4 py-2.5 rounded-lg text-gray-500 cursor-not-allowed" />
                </div>
                
                {/* Callsign / Display Name Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Display Name (Nickname)</label>
                  <select 
                    value={student.callsign} 
                    onChange={(e) => setStudent({...student, callsign: e.target.value})} 
                    className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-2.5 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Rahul">Rahul (Real Name)</option>
                    <option value="GearHead">GearHead</option>
                    <option value="CircuitBreaker">CircuitBreaker</option>
                    <option value="RoboNinja">RoboNinja</option>
                    <option value="MechMaverick">MechMaverick</option>
                    <option value="WrenchMaster">WrenchMaster</option>
                  </select>
                  <p className="text-xs text-gray-500">Visible on the club leaderboard.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Academic Branch</label>
                  <input type="text" value={student.branch} onChange={(e) => setStudent({...student, branch: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-2.5 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8">
                <button type="submit" className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm rounded-lg transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

export default StudentDashboard;