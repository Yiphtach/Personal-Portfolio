const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], default: [] },
  timeline: { type: String, required: true },
  complexity: { type: String, enum: ["Low", "Medium", "High"], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Indexes for faster querying
projectSchema.index({ createdAt: -1 });

// Virtual field for computed data
projectSchema.virtual('daysSinceCreation').get(function () {
  const now = new Date();
  const diff = now - this.createdAt;
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
});

projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
