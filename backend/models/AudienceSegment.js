const mongoose = require('mongoose');
const { Schema } = mongoose;

const audienceSegmentSchema = new Schema({
  name: { type: String, required: true },
  conditions: { type: Object, required: true }, // e.g., { spending: '>10000', visits: '<=3', lastVisit: '3m' }
  audienceSize: { type: Number, default: 0 },
  createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('AudienceSegment', audienceSegmentSchema);

