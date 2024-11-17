import React, { useState } from 'react';
import axios from 'axios';

const MessageSender = () => {
  const [audienceId, setAudienceId] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/messages/send', {
        audienceId,
        messageTemplate,
      });
      setResponseMessage(`Message sent with status: ${response.data.message}`);
    } catch (error) {
      setResponseMessage('Error sending message: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <form onSubmit={handleSend}>
        <div>
          <label>Audience ID:</label>
          <input
            value={audienceId}
            onChange={(e) => setAudienceId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message Template:</label>
          <textarea
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MessageSender;
