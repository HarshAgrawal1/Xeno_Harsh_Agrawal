const express = require('express');
const router = express.Router();

router.get("/stats/:audienceId", async (req, res) => {
  try {
    const { audienceId } = req.params;

    const totalMessages = await CommunicationLog.countDocuments({ audienceId });
    const sentMessages = await CommunicationLog.countDocuments({
      audienceId,
      deliveryStatus: "SENT",
    });
    const failedMessages = totalMessages - sentMessages;

    res.json({
      audienceId,
      totalMessages,
      sentMessages,
      failedMessages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports=router;
