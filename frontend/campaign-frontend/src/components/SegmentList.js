import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/SegmentList.css';

const SegmentList = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSegments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/audience');
      setSegments(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching segments:', err);
      setError('Failed to fetch segments.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this segment?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/audience/${id}`);
      alert('Segment deleted successfully!');
      fetchSegments(); 
    } catch (err) {
      console.error('Error deleting segment:', err);
      alert('Failed to delete segment.');
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  if (loading) {
    return <p className="loading">Loading segments...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="segment-list-container">
      <h2 className="segment-list-heading">Audience Segments</h2>
      {segments.length === 0 ? (
        <p className="no-segments">No segments available. Create a new one!</p>
      ) : (
        <ul className="segment-list">
          {segments.map((segment) => (
            <li className="segment-item" key={segment._id}>
              <div>
                <strong>Name:</strong> {segment.name} <br />
                <strong>ID:</strong> {segment._id} <br />
                <strong>Conditions:</strong> {segment.conditions.length} conditions
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(segment._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SegmentList;
