import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to our Node.js server
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store user token and role in browser's local storage for session management
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      
      alert("Login Successful!");

      // Redirect user based on their assigned role (Admin or Student)
      if (res.data.user.role === 'Admin' || res.data.user.role === 'Superadmin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      // Handling errors like 'User not found' or 'Wrong password'
      alert(err.response?.data?.message || "Login failed! Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={{color: '#fff', marginBottom: '20px'}}>Mechquish Login</h2>
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// Simple professional dark-themed styles
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212' },
  form: { padding: '40px', backgroundColor: '#1e1e1e', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', textAlign: 'center' },
  input: { display: 'block', width: '280px', margin: '15px 0', padding: '12px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#2c2c2c', color: '#fff' },
  button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Login;