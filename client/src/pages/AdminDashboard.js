import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');

  // ⚙️ Global Configuration State (Mapped for Technical Club Logic)
  const [config, setConfig] = useState({
    penaltyCredits: 50, // Penalty for no-show or rule breaking
    registrationLimit: 2, // Maximum concurrent event registrations
    assetDuration: 7    // Days allowed for borrowing tech kits/equipment
  });

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans flex overflow-hidden">
      
      {/* 🛠️ SIDEBAR: MechQuish Command Navigation */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-red-900/30 flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-red-900/20 text-center">
          <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">
            Mech<span className="text-red-600">Quish</span>
          </h1>
          <p className="text-[10px] text-red-500/60 tracking-[0.4em] uppercase mt-2 font-bold">Terminal Control v2.5</p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {[
            { id: 'OVERVIEW', label: 'Command Center', icon: '📊' },
            { id: 'ACTIVITIES', label: 'Event Manager', icon: '⚡' },
            { id: 'USERS', label: 'Operator Database', icon: '👥' },
            { id: 'SETTINGS', label: 'Global Config', icon: '⚙️' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all border ${activeTab === item.id ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30' : 'border-transparent hover:bg-red-950/10 text-gray-500 hover:text-red-400'}`}
            >
               <span className="text-lg">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-red-900/20 bg-black/40">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Active: Admin_Root</p>
          </div>
          <button className="w-full py-2 border border-red-600/30 text-red-500 text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all rounded-lg">Terminate Session</button>
        </div>
      </aside>

      {/* 🚀 MAIN INTERFACE */}
      <main className="flex-1 overflow-y-auto bg-[#050505] relative">
        {/* Tech Grid Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        <div className="min-h-full p-8 md:p-12 relative z-10">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-8 gap-4 text-left">
            <div>
              <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                {activeTab} <span className="text-red-600">COMMAND</span>
              </h2>
              <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-[0.5em] font-bold">Secure Access // Industrial Management Interface</p>
            </div>
            
            <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="SEARCH_OPERATIONAL_DATA..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl text-xs text-white focus:outline-none focus:border-red-600 transition-all font-bold tracking-widest"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
            </div>
          </header>

          {/* --- TAB 1: OVERVIEW & ANALYTICS --- */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Technical Assets", val: "142", tag: "INVENTORY" },
                  { label: "Live Events", val: "03", tag: "ACTIVE" },
                  { label: "Penalty Credits", val: "1,250", tag: "PENDING" },
                  { label: "Core System", val: "STABLE", tag: "STATUS" }
                ].map((s, i) => (
                  <div key={i} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[30px] shadow-2xl">
                    <p className="text-[10px] uppercase font-black text-gray-600 tracking-[0.2em] mb-2">{s.label}</p>
                    <div className="flex justify-between items-end">
                        <p className={`text-3xl font-black ${i % 2 !== 0 ? 'text-red-600' : 'text-white'}`}>{s.val}</p>
                        <span className="text-[10px] font-bold text-red-500 mb-1">{s.tag}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* REAL-TIME OPERATIONS TABLE */}
              <div className="bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-white/5 bg-white/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-left">Live Activity Check-ins</h3>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-black text-[10px] uppercase text-gray-500 tracking-widest border-b border-white/5">
                    <tr>
                      <th className="p-6">Operator ID</th>
                      <th className="p-6">Tech Asset / Event</th>
                      <th className="p-6">Timestamp</th>
                      <th className="p-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-red-600/5 transition-all">
                      <td className="p-6 text-sm font-bold text-white uppercase tracking-tight">2023MECH042</td>
                      <td className="p-6 text-sm text-gray-400">Drone Workshop v2.1</td>
                      <td className="p-6 text-sm text-gray-500 font-mono italic">17-APR-2026 // 14:30</td>
                      <td className="p-6"><span className="text-[10px] px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 font-black">AUTHORIZED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB 2: EVENT & ASSET MANAGER --- */}
          {activeTab === 'ACTIVITIES' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-5 duration-500">
              <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/10 p-10 rounded-[40px] shadow-2xl">
                <h3 className="text-2xl font-black text-white uppercase mb-8 italic text-left tracking-tighter">&gt; Initialize New Activity Plan</h3>
                <form className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] ml-2">Designation Title</label>
                    <input type="text" className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-red-600 text-white font-bold outline-none transition-all" placeholder="e.g. ROBO-SUMO 2026" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] ml-2">Execution Blueprint</label>
                    <textarea rows="4" className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-red-600 text-white outline-none resize-none transition-all" placeholder="Enter Strategic Plan & Rules..."></textarea>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-xs transition-all shadow-lg shadow-red-600/40">Deploy to System</button>
                </form>
              </div>
              
              <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[40px] text-left">
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">Inventory Status</h4>
                  <div className="space-y-4">
                      {['Arduino Mega Kits', 'FPV Drones', 'LiDAR Sensors'].map(asset => (
                          <div key={asset} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group hover:border-red-600/30 transition-all">
                              <span className="text-[11px] font-bold text-white uppercase">{asset}</span>
                              <span className="text-[10px] text-red-600 font-black">05 UNITS</span>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          )}

          {/* --- TAB 3: MEMBER DATABASE (MANAGEMENT CONTROLS) --- */}
          {activeTab === 'USERS' && (
            <div className="space-y-10 animate-in slide-in-from-right-5 duration-500 text-left">
                <div className="bg-[#0d0d0d] border border-white/10 p-10 rounded-[40px] shadow-2xl relative max-w-4xl mx-auto">
                    <div className="absolute -top-4 -right-4 bg-red-600 p-4 rounded-full rotate-12 font-black text-[10px] text-white uppercase shadow-2xl border-4 border-black">Security High</div>
                    <h3 className="text-2xl font-black text-white uppercase mb-2 italic tracking-tighter">&gt; Register New Operator</h3>
                    <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] mb-10 font-bold italic">Manual Credential Assignment Protocol</p>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <input type="text" placeholder="FULL OPERATOR NAME" className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-red-600 text-white outline-none font-bold placeholder:text-gray-700" />
                        <input type="text" placeholder="UNIQUE ROLL / EMP ID" className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-red-600 text-white outline-none font-bold placeholder:text-gray-700" />
                        <select className="w-full bg-black border border-white/10 p-5 rounded-2xl focus:border-red-600 text-white outline-none font-bold uppercase text-xs appearance-none">
                            <option>Role: Student Member</option>
                            <option>Role: Organising Team</option>
                            <option>Role: Technical Admin</option>
                        </select>
                        <button className="bg-white text-black font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:bg-gray-200 transition-all shadow-xl active:scale-95">Generate Credentials</button>
                    </form>
                </div>

                <div className="bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-black text-[10px] uppercase text-gray-500 tracking-widest border-b border-white/5">
                            <tr>
                                <th className="p-8">Operator Identity</th>
                                <th className="p-8">System Status</th>
                                <th className="p-8">Strategic Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="hover:bg-red-600/5 transition-all group">
                                <td className="p-8">
                                    <p className="text-sm font-black text-white uppercase tracking-tight">ROHIT MATHUR</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Lead Organiser // MECH_001</p>
                                </td>
                                <td className="p-8">
                                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full border border-green-500/20 uppercase tracking-widest">Authorized</span>
                                </td>
                                <td className="p-8 space-x-6">
                                    <button className="text-[10px] font-black text-red-600 uppercase hover:underline tracking-widest">Revoke_Access</button>
                                    <button className="text-[10px] font-black text-gray-500 uppercase hover:text-white transition-colors tracking-widest">Reset_Credentials</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          )}

          {/* --- TAB 4: SYSTEM CONFIG (GLOBAL PROTOCOLS) --- */}
          {activeTab === 'SETTINGS' && (
            <div className="max-w-2xl mx-auto bg-[#0d0d0d] border border-red-600/10 p-12 rounded-[50px] shadow-2xl animate-in fade-in duration-500 text-left">
                <h3 className="text-2xl font-black text-white uppercase mb-10 italic tracking-tighter">&gt; Global System Configuration</h3>
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest block ml-1">Attendance Penalty (Credits)</label>
                            <input type="number" value={config.penaltyCredits} onChange={(e) => setConfig({...config, penaltyCredits: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-red-600 font-bold" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest block ml-1">Simultaneous Registrations</label>
                            <input type="number" value={config.registrationLimit} onChange={(e) => setConfig({...config, registrationLimit: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-red-600 font-bold" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest block ml-1">Asset Handover Duration (Days)</label>
                        <input type="number" value={config.assetDuration} onChange={(e) => setConfig({...config, assetDuration: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-red-600 font-bold" />
                    </div>
                    <button className="w-full bg-red-600 text-white font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-xs shadow-lg shadow-red-600/40 hover:bg-red-700 transition-all">Apply Global Protocols</button>
                </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;