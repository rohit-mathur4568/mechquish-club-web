import React, { useState } from 'react';

const AdminDashboard = () => {
  // 1. State setup for form data
  const [eventData, setEventData] = useState({
    title: '',
    plan: '',
    stage: 'Upcoming (Next Activity)'
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Publishing Data to MechQuish DB...", eventData);
    alert("Activity Data Captured! (The backend is down right now, so check the console.)");
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-industrialBlack">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-6 mb-10">
        <div className="relative">
          <div className="absolute inset-0 bg-brandRed/20 blur-[50px] animate-pulse-fast rounded-full"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-white relative z-10 tracking-tight">
  ADMIN <span className="text-brandRed font-black">PORTAL</span>
</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-[#0d0d0d] p-8 rounded-xl border border-gray-900 shadow-xl relative group">
          <h2 className="text-2xl font-bold font-tech text-white mb-8 border-l-4 border-brandRed pl-3 uppercase">
            Create New Event / Activity
          </h2>
          
          {/* Form with onSubmit */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-400 font-tech uppercase text-sm mb-2">Event Title [Required]</label>
              <input 
                type="text" 
                name="title" // Name match hona chahiye state keys se
                value={eventData.title}
                onChange={handleChange}
                placeholder="e.g. Robo-Sumo 2026: Championship" 
                className="industrial-input" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 font-tech uppercase text-sm mb-2">Full Plan [Industrial Specs]</label>
              <textarea 
                name="plan"
                value={eventData.plan}
                onChange={handleChange}
                placeholder="Describe the execution plan..." 
                className="industrial-input h-48"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 font-tech uppercase text-sm mb-2">Activity Stage</label>
                <select 
                  name="stage"
                  value={eventData.stage}
                  onChange={handleChange}
                  className="industrial-input cursor-pointer"
                >
                  <option>Upcoming (Next Activity)</option>
                  <option>Live (Happening Now)</option>
                  <option>Completed (Past)</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button type="submit" className="w-full bg-[#121212] border-2 border-brandRed text-brandRed font-bold py-3 rounded-md hover:bg-brandRed hover:text-white hover:shadow-neon-red transition-all font-tech uppercase tracking-wider">
                  PUBLISH ACTIVITY 
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Stats Panel */}
        <div className="bg-[#0d0d0d] p-8 rounded-xl border border-gray-900 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold font-tech text-white mb-6 uppercase border-l-4 border-gray-700 pl-3">Live Stats</h3>
            <div className="space-y-4">
              <div className="bg-[#121212] p-4 rounded border border-gray-900 flex justify-between items-center">
                <p className="text-gray-400">Total Activities</p>
                <p className="text-3xl font-bold text-white font-tech">08</p>
              </div>
            </div>
          </div>
          <div className="text-center opacity-20 font-tech text-xs tracking-[0.5em] mt-10">MECHQUISH_SYSTEMS_v1.0</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;