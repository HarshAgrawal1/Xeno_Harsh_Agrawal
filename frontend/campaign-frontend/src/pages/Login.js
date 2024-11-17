import React from 'react';
import GoogleAuth from '../components/GoogleAuth';

const Login = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9', // Light background for professional appearance
      padding: '20px',
      boxSizing: 'border-box',
    },
    heading: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '20px',
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: '20px',
    },
    button: {
      display: 'inline-block',
      backgroundColor: '#4285f4',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease-in-out',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: '#357ae8',
    },
    buttonActive: {
      backgroundColor: '#2a65d1',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <div style={styles.buttonContainer}>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Login;
