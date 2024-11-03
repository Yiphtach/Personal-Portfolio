const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  timeline: String,
  complexity: String, // e.g., "Low", "Medium", "High"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
