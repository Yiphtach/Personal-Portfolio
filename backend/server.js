// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const projectRoutes = require('./routes/projectRoutes');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable cross-origin requests

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit on DB connection failure
  });

// API Routes
app.use('/api/projects', projectRoutes);

// Serve static files from the frontend directory
app.use(express.static('frontend'));

// Serve the main HTML page (index.html) at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Fallback route for 404 errors
app.use((req, res, next) => {
  console.error(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: 'Not Found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
