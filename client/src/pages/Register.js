import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    studentClass: '',
    branch: 'Mechanical',
    year: '1',
    password: ''
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // NAME VALIDATION
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.fullName)) {
      alert("INVALID_FORMAT: Full Name must contain only alphabets. Numbers and special characters are not allowed! ⚠️");
      return;
    }

    // EMAIL VALIDATION 
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("INVALID_EMAIL: Email must start with a letter and follow standard format (e.g., student@domain.com)! ⚠️");
      return;
    }

    // MOBILE VALIDATION 
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert("INVALID_MOBILE: Mobile number must be exactly 10 digits! ⚠️");
      return;
    }

    // PASSWORD VALIDATION 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("WEAK_CREDENTIALS: Password must be at least 8 characters long, including an uppercase letter, a number, and a special character! ⚠️");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        role: 'Student' 
      });

      alert("SYSTEM_UPDATE: Registration Successful! Proceed to Login. 🚀");
      navigate('/login'); 

    } catch (err) {
      alert(err.response?.data?.msg || "SERVER_ERROR: Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-sans overflow-hidden bg-[#050505] py-10">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('/mech-bg.png')` }} 
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-[1px]"></div> 
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl p-10 bg-[#121212]/85 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center group"
      >
        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic font-tech">
          New <span className="text-red-600">Operator</span>
        </h2>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-10 font-bold font-tech">System Registration Protocol // v1.0</p>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          <div className="space-y-1">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Full Name</label>
              <input 
                  type="text" name="fullName" placeholder="JOHN DOE" value={formData.fullName} onChange={handleChange} required 
                  className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
              />
          </div>

          <div className="space-y-1">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Email Access_Key</label>
              <input 
                  type="email" name="email" placeholder="example@college.com" value={formData.email} onChange={handleChange} required 
                  className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
              />
          </div>

          <div className="space-y-1">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Mobile Number</label>
              <input 
                  type="tel" name="mobile" placeholder="9876543210" value={formData.mobile} onChange={handleChange} required 
                  className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
              />
          </div>

          <div className="space-y-1">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Class / Section</label>
              <input 
                  type="text" name="studentClass" placeholder="e.g. B.Tech Sec-A" value={formData.studentClass} onChange={handleChange} required 
                  className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
              />
          </div>

          <div className="space-y-1">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Branch</label>
              <select name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer font-tech">
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical">Electrical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Electronics">Electronics & Comm.</option>
              </select>
          </div>

          <div className="space-y-1">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Year of Study</label>
              <select name="year" value={formData.year} onChange={handleChange} className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer font-tech">
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
              </select>
          </div>

          <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Security_Password</label>
              <div className="relative">
                  <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      placeholder="Min 8 chars, 1 Uppercase, 1 Number, 1 Special Char" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-black/50 border border-white/5 text-white p-4 pr-16 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
                  />
                  <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest transition-colors font-tech"
                  >
                      {showPassword ? "HIDE" : "SHOW"}
                  </button>
              </div>
          </div>

          <button 
            type="submit" 
            className="w-full md:col-span-2 bg-red-600 text-white font-black py-4 rounded-xl mt-6 hover:bg-red-700 shadow-lg hover:shadow-red-600/40 transition-all uppercase tracking-widest text-sm active:scale-95 font-tech"
          >
            Create_Credentials
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-gray-500 text-[11px] font-bold font-tech uppercase tracking-widest">
            Already have an active session?{' '}
            <Link to="/login" className="text-red-500 hover:text-red-400 transition-colors ml-1">
              Return to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;