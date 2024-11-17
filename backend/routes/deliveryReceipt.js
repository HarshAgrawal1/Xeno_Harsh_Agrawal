const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');

// Delivery Receipt API
router.post('/delivery-receipt', async (req, res) => {
  try {
    const { logId, status } = req.body;

    // Update communication log with delivery status
    await CommunicationLog.findByIdAndUpdate(logId, { deliveryStatus: status });

    res.json({ success: true, message: 'Delivery status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
