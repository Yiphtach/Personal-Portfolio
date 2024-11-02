const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectMetrics } = require('./projectController');

router.post('/', createProject);
router.get('/', getProjects);
router.get('/metrics', getProjectMetrics); // New endpoint for metrics

module.exports = router;
