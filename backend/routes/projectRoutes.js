const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Metrics routes (for dashboard metrics)
router.get('/metrics/tech-count', projectController.getProjectCountByTech);
router.get('/metrics/complexity-count', projectController.getProjectCountByComplexity); // Keeping this for complexity count
router.get('/metrics/time-spent', projectController.getTimeSpentOnProjects);
router.get('/metrics/timeline', projectController.getProjectTimeline);

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

// Route to handle contact form submissions
router.post('/contact', projectController.contactForm);

module.exports = router;
