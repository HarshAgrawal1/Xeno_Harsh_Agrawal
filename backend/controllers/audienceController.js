const AudienceSegment = require("../models/AudienceSegment");
const Customer = require("../models/Customer"); // Assuming this exists

// Generate a unique Int32 ID for each segment
const generateUniqueId = async () => {
  const lastSegment = await AudienceSegment.findOne().sort({ id: -1 });
  return lastSegment ? lastSegment.id + 1 : 1; // Increment by 1 or start with 1
};

// Create a new audience segment
const createSegment = async (req, res) => {
  try {
    const { name, conditions, logic } = req.body;

    // Generate a unique Int32 ID
    const id = await generateUniqueId();

    // Build the MongoDB query dynamically
    const query = conditions.map((cond) => {
      const fieldMap = {
        spending: "totalSpending",
        visits: "visits",
        lastVisit: "lastVisit",
      };
      const operatorMap = { gt: "$gt", lt: "$lt", eq: "$eq" };
      const field = fieldMap[cond.field];
      const operator = operatorMap[cond.operator];

      return { [field]: { [operator]: cond.value } };
    });

    const mongoQuery = logic === "AND" ? { $and: query } : { $or: query };

    // Query the database to get audience size
    const audienceSize = await Customer.countDocuments(mongoQuery);

    // Save the segment
    const segment = new AudienceSegment({
      id,
      name,
      conditions,
      logic,
      audienceSize,
    });
    await segment.save();

    res
      .status(201)
      .json({ message: "Audience segment created successfully", segment });
  } catch (error) {
    console.error("Error in createSegment:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all audience segments
const getSegments = async (req, res) => {
  try {
    const segments = await AudienceSegment.find();
    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const previewSize = async (req, res) => {
  try {
    const { conditions } = req.body;
    let query = {};
    if (conditions.spending) {
      query.total_spending = { $gt: conditions.spending };
    }
    if (conditions.visits) {
      query.visits = { $lte: conditions.visits };
    }
    if (conditions.lastVisit) {
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - conditions.lastVisit);
      query.last_visit = { $lte: cutoffDate };
    }
    const size = await Customer.countDocuments(query);
    res.status(200).json({ size });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an audience segment by its Int32 ID
const deleteSegment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSegment = await AudienceSegment.findOneAndDelete({
      id: parseInt(id, 10),
    });
    if (!deletedSegment) {
      return res.status(404).json({ message: "Segment not found" });
    }
    res.status(200).json({ message: "Segment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSegment, getSegments, previewSize, deleteSegment };

module.exports = { createSegment, getSegments, previewSize, deleteSegment };
