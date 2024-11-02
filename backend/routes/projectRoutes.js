const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectMetrics } = require('../controllers/projectController'); // Updated path to controllers

// Route for creating a project
router.post('/', createProject);

// Route for fetching all projects
router.get('/', getProjects);

// Route for fetching project metrics
router.get('/metrics', getProjectMetrics); // New endpoint for metrics

module.exports = router;
