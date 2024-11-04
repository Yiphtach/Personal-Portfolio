const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Metrics routes (for dashboard metrics)
router.get('/metrics/tech-count', projectController.getProjectCountByTech);
router.get('/metrics/complexity-count', projectController.getProjectCountByComplexity);
router.get('/metrics/time-spent', projectController.getTimeSpentOnProjects);
router.get('/metrics/timeline', projectController.getProjectTimeline);

// Project CRUD routes
router.post('/', projectController.createProject); // Route to create a new project
router.get('/', projectController.getProjects); // Get all projects with optional filters
router.get('/:id', projectController.getProjectById); // Get a project by ID
router.put('/:id', projectController.updateProject); // Update a project by ID
router.delete('/:id', projectController.deleteProject); // Delete a project by ID

// GitHub Projects Route
router.get('/github', projectController.getGitHubProjects); // Route for GitHub projects

// Contact Form Route
router.post('/contact', projectController.contactForm);

module.exports = router;
