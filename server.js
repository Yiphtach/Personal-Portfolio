// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const projectRoutes = require('./backend/routes/projectRoutes');

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
app.use('/projects', projectRoutes);

// Serve static files from the frontend and root directories
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'views')));

// Serve the main HTML page (index.html) at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve HTML files from the views directory
app.get('/views/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, `views/${page}.html`));
});

// Route to serve the dashboard HTML page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

// Route to serve the projects HTML page
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/projects.html'));
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
