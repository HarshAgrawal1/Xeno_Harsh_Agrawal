import React, { useState } from 'react';
import axios from 'axios';

const CampaignStats = () => {
  const [audienceId, setAudienceId] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleFetchStats = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stats/${audienceId}`);
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching stats: ' + err.message);
      setStats(null);
    }
  };

  return (
    <div>
      <h2>Campaign Statistics</h2>
      <div>
        <label>Audience ID:</label>
        <input
          value={audienceId}
          onChange={(e) => setAudienceId(e.target.value)}
        />
        <button onClick={handleFetchStats}>Fetch Stats</button>
      </div>
      {error && <p>{error}</p>}
      {stats && (
        <div>
          <p>Total Messages: {stats.totalMessages}</p>
          <p>Messages Sent: {stats.sentMessages}</p>
          <p>Messages Failed: {stats.failedMessages}</p>
        </div>
      )}
    </div>
  );
};

export default CampaignStats;
