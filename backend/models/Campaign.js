const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment', required: true },
  name: { type: String, required: true },
  dateSent: { type: Date, default: Date.now },
  stats: {
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    bounces: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Campaign', campaignSchema);

