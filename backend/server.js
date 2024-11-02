const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path module
const projectRoutes = require('./routes/projectRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in the .env file.");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/projects', projectRoutes);

// Fallback route to serve index.html for any unmatched route (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("\nShutting down gracefully...");
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB");
  process.exit(0);
});
