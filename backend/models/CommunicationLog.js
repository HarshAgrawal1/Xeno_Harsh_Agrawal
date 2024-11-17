const mongoose = require('mongoose');
const { Schema } = mongoose;

const communicationLogSchema = new Schema({
  audienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment', required: true },
  message: { type: String, required: true },
  deliveryStatus: { type: String, enum: ['SENT', 'FAILED']},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommunicationLog', communicationLogSchema);
