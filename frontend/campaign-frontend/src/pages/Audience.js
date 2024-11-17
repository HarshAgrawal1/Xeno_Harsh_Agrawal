// src/pages/Audience.js
import React from 'react';
import SegmentForm from '../components/SegmentForm';
import SegmentList from '../components/SegmentList';

const Audience = () => {
  const styles = {
    heading: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '20px',
      textAlign: 'center',
    }
  };
  return (
    <div>
      <h1 style={styles.heading}>Audience Management</h1>
      <SegmentForm />
      <SegmentList />
    </div>
  );
};

export default Audience;
