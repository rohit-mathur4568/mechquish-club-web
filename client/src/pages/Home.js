import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>Welcome to Mechquish Club Portal</h1>
      <p>Innovation | Engineering | Excellence</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Login to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;