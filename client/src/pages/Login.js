import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    //  CREDENTIAL VALIDATION LOGIC
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("INVALID_ACCESS_KEY: Please enter a valid Email address! ⚠️");
      return;
    }
    if (password.length < 6) {
      alert("SECURITY_PROTOCOL_ERROR: Password must be at least 6 characters! ⚠️");
      return;
    }
    if (!isLogin && name.trim().length < 3) {
      alert("IDENTITY_ERROR: Please enter your full name! ⚠️");
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user.role);
        alert("SYSTEM_AUTHORIZED: Session Activated! 🚀");
        if (res.data.user.role === 'Admin' || res.data.user.role === 'Superadmin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert("REGISTRATION_COMPLETE: Redirecting to Login...");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "ACCESS_DENIED: Critical Authentication Failure!");
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center font-sans overflow-hidden bg-[#050505]">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('/mech-bg.png')` }} 
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-[1px]"></div> 
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md p-10 bg-[#121212]/85 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center group"
        >
            <div className="relative mb-8 flex justify-center">
                {/* Pulsing Red Glow */}
                <div className="absolute inset-0 bg-red-600/25 blur-3xl rounded-full animate-pulse scale-150"></div>
                
                {/* Rotating Container */}
                <div className="animate-gear-rotate relative z-10 h-24 w-24">
                  <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="h-24 w-24 rounded-full bg-white p-1 border-2 border-red-600 shadow-neon-red" 
                  />
                </div>
            </div>

          <h2 className="text-3xl font-black text-white mb-2 tracking-tighter font-tech uppercase italic">
            {isLogin ? 'Member Login' : 'Registration'}
          </h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-10 font-tech">MechQuish Systems v2.3 // Secure Session</p>

          <form onSubmit={handleAuth} className="space-y-4 text-left">
            {!isLogin && (
                <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold tracking-widest font-tech">Operator Identity</label>
                    <input 
                        type="text" placeholder="ROHIT MATHUR" value={name}
                        onChange={(e) => setName(e.target.value)} required 
                        className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
                    />
                </div>
            )}

            <div className="space-y-1">
                <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Email Access_Key</label>
                <input 
                    type="email" placeholder="example@college.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} required 
                    className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-widest font-tech">Security_Password</label>
                <input 
                    type="password" placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)} required 
                    className="w-full bg-black/50 border border-white/5 text-white p-4 rounded-xl focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700 font-tech"
                />
            </div>

            <button 
              type="submit" 
              className="w-full bg-red-600 text-white font-black py-4 rounded-xl mt-6 hover:bg-red-700 shadow-lg hover:shadow-red-600/40 transition-all uppercase tracking-widest text-sm active:scale-95 font-tech"
            >
              {isLogin ? 'Initialize_Session' : 'Finalize_Registration'}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 hover:text-red-500 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors font-tech"
            >
                {isLogin ? "Need new credentials? Register" : "Existing operator? Login"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Login;