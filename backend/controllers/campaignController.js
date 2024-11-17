const Campaign = require('../models/Campaign');
const AudienceSegment = require('../models/AudienceSegment');


const getCampaignHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const campaigns = await Campaign.find({ userId: req.user._id })
      .populate('segmentId', 'name description') // Fetch name and description from AudienceSegment
      .sort({ dateSent: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new campaign with a segment ID
const createCampaign = async (req, res) => {
  try {
    const { name, segmentId } = req.body;
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Check if the segment exists
    const segment = await AudienceSegment.findById(segmentId);
    if (!segment) {
      return res.status(404).json({ error: 'Audience segment not found' });
    }

    const newCampaign = new Campaign({
      userId: req.user._id,
      name,
      segmentId,
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', newCampaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCampaignHistory, createCampaign };
