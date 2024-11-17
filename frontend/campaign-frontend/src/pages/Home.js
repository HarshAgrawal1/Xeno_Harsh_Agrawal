


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
 
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          <h1 className="dashboard-heading">Welcome, {user.name}!</h1>
          <img
            className="dashboard-avatar"
            src={user.avatar}
            alt={`${user.name}'s avatar`}
          />
          <p className="dashboard-email">Email: {user.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <h1 className="error-message">
          Please Login first to visit this website. Xeno Assignment by Harsh Agrawal
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
