// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// API Routes
app.use('/api/projects', projectRoutes);

// Serve static files for the frontend
app.use(express.static('frontend'));

// Root route to serve the main HTML page (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Fallback route for 404 errors
app.use((req, res, next) => {
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
