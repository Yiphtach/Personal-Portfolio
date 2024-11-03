const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route to create a new project
router.post('/', projectController.createProject);

// Route to get all projects with optional filtering and sorting
router.get('/', projectController.getProjects);

// Route to get a specific project by ID
router.get('/:id', projectController.getProjectById);

// Route to update a specific project by ID
router.put('/:id', projectController.updateProject);

// Route to delete a specific project by ID
router.delete('/:id', projectController.deleteProject);

// Route to get project count by technology (for dashboard metrics)
router.get('/metrics/tech-count', projectController.getProjectCountByTech);

// Route to get project count by complexity (for dashboard metrics)
router.get('/metrics/complexity-count', projectController.getProjectCountByComplexity);

// Route to get project timeline data (for dashboard metrics)
router.get('/metrics/timeline', projectController.getProjectTimeline);

// Route to handle contact form submissions (optional)
router.post('/contact', projectController.contactForm);

module.exports = router;
