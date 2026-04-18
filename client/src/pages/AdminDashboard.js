import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [activities, setActivities] = useState([]);
  
  // State for activity creation form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Technical Workshop');
  const [targetBranch, setTargetBranch] = useState('All Branches');

  // Operational metrics for dashboard overview
  const stats = [
    { label: "Total Members", val: "450", color: "text-white" },
    { label: "Ongoing Events", val: "02", color: "text-green-500" },
    { label: "Current Status", val: "LIVE", color: "text-red-600" }, 
    { label: "New Requests", val: "12", color: "text-yellow-500" } 
  ];

  // Logic to post new event data to backend
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const body = { title, planDetails: description, type, targetBranch };
      await axios.post('http://localhost:5000/api/admin/activities', body, {
        headers: { 'x-auth-token': token }
      });
      alert("Event Created Successfully!");
      setTitle(''); setDescription('');
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans flex overflow-hidden">
      
      {/* Primary Sidebar Navigation */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-20">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
            Mech<span className="text-red-600">Quish</span>
          </h1>
          <p className="text-[9px] text-gray-500 tracking-[0.3em] uppercase mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'DASHBOARD', label: 'Dashboard', icon: '🏠' },
            { id: 'EVENTS', label: 'Manage Events', icon: '📅' },
            { id: 'USERS', label: 'Member Approvals', icon: '✅' },
            { id: 'ASSETS', label: 'Club Assets', icon: '📦' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'}`}
            >
               <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="w-full py-2 bg-white/5 text-gray-400 text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all rounded-lg">Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10">
        
        <header className="mb-10 text-left">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            {activeTab.replace('_', ' ')}
          </h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">MechQuish Club Management System</p>
        </header>

        {/* Tab Content: Dashboard Overview */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">{s.label}</p>
                  <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 text-left">
              <h3 className="text-sm font-bold uppercase mb-4">Recent Activity Logs</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-xl text-xs flex justify-between">
                  <span>New Member Registered: Rahul Sharma</span>
                  <span className="text-gray-500">2 mins ago</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl text-xs flex justify-between">
                  <span>Event Started: CAD Workshop</span>
                  <span className="text-green-500 font-bold">LIVE NOW</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Event Creation and Management */}
        {activeTab === 'EVENTS' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            <div className="bg-[#0d0d0d] border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white uppercase mb-6 italic tracking-tight">Post New Event</h3>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Event Name</label>
                  <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600" placeholder="e.g. RoboRace 2026" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Category</label>
                    <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 appearance-none">
                      <option>Technical Workshop</option>
                      <option>Competition</option>
                      <option>Guest Lecture</option>
                      <option>Social Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Branch</label>
                    <select value={targetBranch} onChange={(e)=>setTargetBranch(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 appearance-none">
                      <option>All Branches</option>
                      <option>Mechanical</option>
                      <option>CS / IT</option>
                      <option>Civil</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Event Details</label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="4" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600" placeholder="Rules & Schedule..."></textarea>
                </div>
                <button className="w-full bg-red-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg">Create Event</button>
              </form>
            </div>

            <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-2xl">
              <h3 className="text-sm font-bold uppercase mb-6 text-gray-400">Past Events Records</h3>
              <div className="space-y-4">
                {['Introduction to Gears', 'Industrial Visit'].map(e => (
                  <div key={e} className="p-4 border border-white/5 rounded-xl flex justify-between items-center bg-black/40">
                    <span className="text-xs font-bold uppercase">{e}</span>
                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded uppercase font-bold">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Member Approval and Bulk Actions */}
        {activeTab === 'USERS' && (
          <div className="space-y-6">
            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 bg-green-600/10 text-green-500 border border-green-500/20 rounded-xl text-[10px] font-bold uppercase hover:bg-green-600 hover:text-white transition-all">
                Approve All Pending
              </button>
              <button className="px-6 py-2 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all">
                Reject All Pending
              </button>
            </div>

            <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase text-gray-500 tracking-widest">
                  <tr>
                    <th className="p-6">Member Name</th>
                    <th className="p-6">Academic Branch</th>
                    <th className="p-6">Current Status</th>
                    <th className="p-6">Operational Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-all">
                    <td className="p-6 text-xs font-bold text-white uppercase tracking-tight">Sumit Kumar</td>
                    <td className="p-6 text-xs text-gray-400 uppercase tracking-tighter">MECH - 2nd Year</td>
                    <td className="p-6">
                      <span className="text-[10px] px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20 font-bold uppercase">Pending</span>
                    </td>
                    <td className="p-6 space-x-6 text-xs">
                      <button className="font-bold text-green-500 uppercase hover:underline">Approve</button>
                      <button className="font-bold text-red-500 uppercase hover:underline">Reject</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Inventory and Asset Tracking */}
        {activeTab === 'ASSETS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { name: "3D Printer Kit", qty: "02", status: "Available" },
              { name: "Robotics Sensors", qty: "15", status: "In Stock" },
              { name: "Welding Equipment", qty: "01", status: "Issued" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#0d0d0d] border border-white/5 rounded-2xl">
                <h4 className="text-white font-bold uppercase text-sm mb-2 tracking-tight">{item.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Quantity: {item.qty}</span>
                  <span className={`text-[9px] font-black px-2 py-1 rounded uppercase ${item.status === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;