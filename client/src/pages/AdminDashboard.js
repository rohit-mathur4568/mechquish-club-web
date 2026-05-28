import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const navigate = useNavigate(); 
  
  // ================= STATE: EVENTS =================
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Technical Workshop');
  const [targetBranch, setTargetBranch] = useState('All Branches');

  // ================= STATE: TEAM CMS =================
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); 
  const [formData, setFormData] = useState({
    name: '', role: '', category: 'CoreTeam', description: '', image: ''
  });

  // 1. STATE: LIVE DASHBOARD STATS 
  const [dashboardStats, setDashboardStats] = useState({
    totalMembers: 0,
    ongoingEvents: 0,
    newRequests: 0
  });

  // 2. FUNCTION: FETCH REAL-TIME STATS FROM DATABASE
  const fetchStats = async () => {
    try {
      // Retrieve auth token for admin verification
      const token = localStorage.getItem('token'); 
      const res = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { 'x-auth-token': token }
      });
      
      // Update state with live database metrics
      setDashboardStats({
        totalMembers: res.data.totalMembers,
        ongoingEvents: res.data.ongoingEvents,
        newRequests: res.data.newRequests
      });
      console.log("System Stats synchronized successfully.");
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
    }
  };

  // ================= API: TEAM CMS LOGIC =================
  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members/all');
      console.log("Team data retrieved successfully from the database.", res.data); 
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // 3. EFFECT HOOK: Fetch initial data on component mount
  useEffect(() => {
    fetchMembers();
    fetchStats(); // Triggering the stats API call
  }, []);

  // 4. BINDING STATE TO DASHBOARD METRICS (Mock Data Replaced)
  const stats = [
    { label: "Total Members", val: dashboardStats.totalMembers, color: "text-white" },
    { label: "Ongoing Events", val: dashboardStats.ongoingEvents < 10 ? `0${dashboardStats.ongoingEvents}` : dashboardStats.ongoingEvents, color: "text-green-500" },
    { label: "Current Status", val: "LIVE", color: "text-red-600" }, 
    { label: "New Requests", val: dashboardStats.newRequests < 10 ? `0${dashboardStats.newRequests}` : dashboardStats.newRequests, color: "text-yellow-500" } 
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Process Photo Upload & Base64 Conversion
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); 
      };
    }
  };

  // Triggered when Edit button is clicked
  const handleEditClick = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      category: member.category || 'CoreTeam',
      description: member.description || '',
      image: member.image || ''
    });
    setEditId(member._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // UPDATED FUNCTION: Handles both Add and Update operations
  const handleAddMember = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role) {
      alert("Name and Role are mandatory fields!");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        // UPDATE EXISTING MEMBER
        await axios.put(`http://localhost:5000/api/members/update/${editId}`, formData);
        alert("Member successfully UPDATED! ✏️");
      } else {
        // ADD NEW MEMBER
        await axios.post('http://localhost:5000/api/members/add', formData);
        alert("Member successfully ADDED to the database! 🔥");
      }
      
      // Reset form and states
      setFormData({ name: '', role: '', category: 'CoreTeam', description: '', image: '' });
      setEditId(null);
      fetchMembers(); 
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert("Server not responding. Please verify backend connectivity.");
      }
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm("SYSTEM WARNING: Are you sure you want to permanently delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/members/${id}`);
        fetchMembers(); 
      } catch (error) {
        alert("An error occurred while deleting the record.");
        console.error("Deletion Error:", error);
      }
    }
  };

  // ================= API: EVENT CREATION LOGIC =================
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const body = { title, planDetails: description, type, targetBranch };
      await axios.post('http://localhost:5000/api/admin/activities', body, {
        headers: { 'x-auth-token': token }
      });
      alert("Event successfully created!");
      setTitle(''); setDescription('');
    } catch (err) {
      alert("An error occurred while creating the event.");
    }
  };

  // ================= SECURE LOGOUT =================
  const handleLogout = () => {
    if (window.confirm("SYSTEM WARNING: Are you sure you want to terminate the secure session?")) {
      localStorage.clear(); 
      navigate('/login'); 
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
            { id: 'TEAM', label: 'Manage Team', icon: '👥' },
            { id: 'EVENTS', label: 'Manage Events', icon: '📅' },
            { id: 'USERS', label: 'Member Approvals', icon: '✅' },
            { id: 'ASSETS', label: 'Club Assets', icon: '📦' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-500 hover:bg-white/5'}`}
            >
               <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 flex flex-col gap-3">
          <Link to="/" className="w-full py-2 flex justify-center items-center gap-2 bg-white/5 text-gray-400 text-[10px] font-bold uppercase hover:bg-white/10 hover:text-white transition-all rounded-lg border border-white/5">
            <span>🏠</span> Back to Website
          </Link>
          <button 
            onClick={handleLogout} 
            className="w-full py-2 bg-white/5 text-gray-400 text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all rounded-lg shadow-lg hover:shadow-red-600/40 active:scale-95"
          >
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none"></div>

        <header className="mb-10 text-left relative z-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            {activeTab.replace('_', ' ')}
          </h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">MechQuish Club Management System</p>
        </header>

        <div className="relative z-10">
          {/* Tab Content: Dashboard Overview */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl shadow-xl">
                    <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">{s.label}</p>
                    <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 text-left shadow-xl max-w-3xl">
                <h3 className="text-sm font-bold uppercase mb-4 text-white">Recent Activity Logs</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-xl text-xs flex justify-between items-center border border-white/5">
                    <span className="text-gray-300">New Member Registered: <span className="font-bold text-white">Rahul Sharma</span></span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider">2 mins ago</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl text-xs flex justify-between items-center border border-white/5">
                    <span className="text-gray-300">Event Started: <span className="font-bold text-white">AWS Workshop</span></span>
                    <span className="text-green-500 font-black text-[10px] uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">LIVE NOW</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TEAM CMS ================= */}
          {activeTab === 'TEAM' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              
              {/* Form Section */}
              <div className="bg-[#0d0d0d] border border-white/10 p-8 rounded-2xl shadow-xl h-fit">
                <h3 className="text-xl font-bold text-white uppercase mb-6 italic tracking-tight border-b border-white/5 pb-4">
                  {editId ? 'Update Member Profile' : 'Inject New Member'}
                </h3>
                <form onSubmit={handleAddMember} className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required type="text" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 transition-colors" placeholder="e.g. Tanishka Rathore" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Role / Title</label>
                      <input name="role" value={formData.role} onChange={handleChange} required type="text" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 transition-colors" placeholder="e.g. President" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 appearance-none transition-colors">
                        <option value="CoreTeam">Core Team</option>
                        <option value="Faculty">Faculty Advisor</option>
                      </select>
                    </div>
                  </div>

                  {/* FILE UPLOAD INPUT */}
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Upload Profile Photo</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUpload} 
                        className="w-full bg-black border border-white/10 p-3 rounded-xl text-white outline-none focus:border-red-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
                      />
                      {formData.image && (
                        <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden shrink-0">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.category === 'Faculty' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Faculty Quote / Bio</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 resize-none transition-colors" placeholder="Guiding excellence..."></textarea>
                    </motion.div>
                  )}

                  <div className="flex gap-4 mt-2">
                    <button type="submit" disabled={loading} className="w-full bg-red-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg disabled:opacity-50">
                      {loading ? 'Processing...' : (editId ? 'Update Member Data' : 'Upload to Database')}
                    </button>
                    
                    {/* Cancel Edit Button */}
                    {editId && (
                      <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', role: '', category: 'CoreTeam', description: '', image: '' }); }} className="px-6 bg-gray-800 text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-gray-700 transition-all">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Live Database View */}
              <div className="space-y-6">
                
                {/* Faculty DB Box */}
                <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl shadow-xl">
                  <h3 className="text-sm font-bold uppercase mb-4 text-white flex justify-between items-center border-b border-white/5 pb-2">
                    Faculty Database
                    <span className="text-[10px] bg-red-600/20 text-red-500 px-2 py-1 rounded">{members.filter(m => m?.category?.includes('Faculty')).length} Active</span>
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {members.filter(m => m?.category?.includes('Faculty')).map(teacher => (
                      <div key={teacher._id} className="p-3 border border-white/5 rounded-xl flex justify-between items-center bg-black/40 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center text-xs font-black text-gray-300">
                            {teacher.image && teacher.image.length > 5 ? (
                              <img src={teacher.image} alt="fac" className="w-full h-full object-cover"/>
                            ) : (
                              teacher.image || "👨‍🏫"
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white uppercase">{teacher.name}</p>
                            <p className="text-[9px] text-red-500 uppercase tracking-widest">{teacher.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditClick(teacher)} className="text-[10px] text-blue-500 hover:text-blue-400 font-bold uppercase transition-colors">Edit</button>
                          <span className="text-gray-700">|</span>
                          <button onClick={() => handleDeleteMember(teacher._id)} className="text-[10px] text-gray-500 hover:text-red-500 font-bold uppercase transition-colors">Delete</button>
                        </div>
                      </div>
                    ))}
                    {members.filter(m => m?.category?.includes('Faculty')).length === 0 && <p className="text-xs text-gray-600 italic">Database Empty</p>}
                  </div>
                </div>

                {/* Core Team DB Box */}
                <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl shadow-xl">
                  <h3 className="text-sm font-bold uppercase mb-4 text-white flex justify-between items-center border-b border-white/5 pb-2">
                    Core Team Database
                    <span className="text-[10px] bg-red-600/20 text-red-500 px-2 py-1 rounded">{members.filter(m => m?.category?.includes('Core')).length} Active</span>
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {members.filter(m => m?.category?.includes('Core')).map(student => (
                      <div key={student._id} className="p-3 border border-white/5 rounded-xl flex justify-between items-center bg-black/40 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center text-xs font-black text-gray-300">
                            {student.image && student.image.length > 5 ? (
                              <img src={student.image} alt="stu" className="w-full h-full object-cover"/>
                            ) : (
                              student.image || student.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white uppercase">{student.name}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest">{student.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditClick(student)} className="text-[10px] text-blue-500 hover:text-blue-400 font-bold uppercase transition-colors">Edit</button>
                          <span className="text-gray-700">|</span>
                          <button onClick={() => handleDeleteMember(student._id)} className="text-[10px] text-gray-500 hover:text-red-500 font-bold uppercase transition-colors">Delete</button>
                        </div>
                      </div>
                    ))}
                    {members.filter(m => m?.category?.includes('Core')).length === 0 && <p className="text-xs text-gray-600 italic">Database Empty</p>}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab Content: Event Creation and Management */}
          {activeTab === 'EVENTS' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              <div className="bg-[#0d0d0d] border border-white/10 p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-white uppercase mb-6 italic tracking-tight border-b border-white/5 pb-4">Post New Event</h3>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Event Name</label>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 transition-colors" placeholder="e.g. RoboRace 2026" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Category</label>
                      <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 appearance-none transition-colors">
                        <option>Technical Workshop</option>
                        <option>Competition</option>
                        <option>Guest Lecture</option>
                        <option>Social Event</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Branch</label>
                      <select value={targetBranch} onChange={(e)=>setTargetBranch(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 appearance-none transition-colors">
                        <option>All Branches</option>
                        <option>Mechanical</option>
                        <option>CS / IT</option>
                        <option>Civil</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Event Details</label>
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="4" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-red-600 resize-none transition-colors" placeholder="Rules & Schedule..."></textarea>
                  </div>
                  <button className="w-full bg-red-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg mt-2">Create Event</button>
                </form>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-2xl shadow-xl">
                <h3 className="text-sm font-bold uppercase mb-6 text-white border-b border-white/5 pb-2">Past Events Records</h3>
                <div className="space-y-4">
                  {['Introduction to Gears', 'Industrial Visit'].map(e => (
                    <div key={e} className="p-4 border border-white/5 rounded-xl flex justify-between items-center bg-black/40">
                      <span className="text-xs font-bold uppercase text-gray-300">{e}</span>
                      <span className="text-[10px] bg-white/10 text-white px-2 py-1 rounded uppercase font-bold">Completed</span>
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
                        <button className="font-bold text-green-500 uppercase hover:text-green-400">Approve</button>
                        <button className="font-bold text-red-500 uppercase hover:text-red-400">Reject</button>
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
                <div key={i} className="p-6 bg-[#0d0d0d] border border-white/5 rounded-2xl shadow-xl">
                  <h4 className="text-white font-bold uppercase text-sm mb-4 tracking-tight">{item.name}</h4>
                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Quantity: {item.qty}</span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded uppercase border ${item.status === 'Available' || item.status === 'In Stock' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Inline style for custom scrollbar in DB boxes */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}} />
    </div>
  );
};

export default AdminDashboard;