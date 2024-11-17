import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/CampaignHistory.css';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/campaign/history', {
        withCredentials: true, 
      });
      setCampaigns(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="campaign-history">
      <h2>Your Campaign History</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found</p>
      ) : (
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign._id}>
              <div>
                <strong>{campaign.name}</strong>
                <p>Segment: {campaign.segmentId?.name}</p>
                <p>Description: {campaign.segmentId?.description}</p>
                <p>Sent on: {new Date(campaign.dateSent).toLocaleDateString()}</p>
                <p>Opens: {campaign.stats.opens}</p>
                <p>Clicks: {campaign.stats.clicks}</p>
                <p>Bounces: {campaign.stats.bounces}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignHistory;
