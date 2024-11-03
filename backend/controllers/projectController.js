const Project = require('../models/Project');

// Create a new project
async function createProject(req, res) {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
}

// Get all projects with optional filtering and sorting
async function getProjects(req, res) {
  const { tech, sort } = req.query;
  
  let filter = {};
  if (tech && tech !== 'all') {
    filter.technologies = tech;
  }

  let sortOption = {};
  if (sort === 'date') {
    sortOption = { createdAt: -1 };
  } else if (sort === 'complexity') {
    sortOption = { complexity: 1 };
  }

  try {
    const projects = await Project.find(filter).sort(sortOption);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

// Get a specific project by ID
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
}

// Update an existing project by ID
async function updateProject(req, res) {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
}

// Delete a project by ID
async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
}

// Get project count by technology (for dashboard)
async function getProjectCountByTech(req, res) {
  try {
    const techData = await Project.aggregate([
      { $unwind: "$technologies" },
      { $group: { _id: "$technologies", count: { $sum: 1 } } }
    ]);
    res.json(techData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project count by technology' });
  }
}

// Get project count by complexity (for dashboard)
async function getProjectCountByComplexity(req, res) {
  try {
    const complexityData = await Project.aggregate([
      { $group: { _id: "$complexity", count: { $sum: 1 } } }
    ]);
    res.json(complexityData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project count by complexity' });
  }
}

// Get project timeline data (for dashboard)
async function getProjectTimeline(req, res) {
  try {
    const timelineData = await Project.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);
    res.json(timelineData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project timeline' });
  }
}

// Get time spent on projects
async function getTimeSpentOnProjects(req, res) {
  try {
    const timeData = await Project.aggregate([
      { $group: { _id: "$title", totalTime: { $sum: "$timeline" } } }  // Assumes 'timeline' stores time spent
    ]);
    res.json(timeData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching time spent metrics' });
  }
}

// Handle contact form submission
async function contactForm(req, res) {
  const { name, email, message } = req.body;
  try {
    // Log submission, or integrate with email or support services
    console.log("Contact Form Submitted:", { name, email, message });
    res.json({ status: 'success', message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process contact form' });
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectCountByTech,
  getProjectCountByComplexity,
  getProjectTimeline,
  getTimeSpentOnProjects,
  contactForm
};
