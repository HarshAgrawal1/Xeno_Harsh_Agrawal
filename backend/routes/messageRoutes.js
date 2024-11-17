const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');

// Dummy API to send messages
router.post('/send', async (req, res) => {
  try {
    const { audienceId, messageTemplate } = req.body;

    // Generate personalized message
    const personalizedMessage = `Hi [Name], here’s 10% off on your next order!`.replace(
      '[Name]',
      'Customer'
    );

    // Save the message in the communications_log
    const communicationLog = await CommunicationLog.create({
      audienceId,
      message: personalizedMessage,
    });

    // Call the Delivery Receipt API
    const deliveryStatus = Math.random() < 0.9 ? 'SENT' : 'FAILED';

    // Update delivery status
    await CommunicationLog.findByIdAndUpdate(communicationLog._id, {
      deliveryStatus,
    });

    res.json({
      success: true,
      message: `Message sent with status: ${deliveryStatus}`,
      logId: communicationLog._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
router.get('/send',(req,res)=>{
    res.send("Sending problem");
});

module.exports = router;
