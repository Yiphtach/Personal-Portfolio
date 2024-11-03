const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  timeline: String,
  complexity: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["In Progress", "Completed", "Pending"], default: "In Progress" },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

// Middleware to update 'lastUpdated' on every save
projectSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
