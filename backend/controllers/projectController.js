const Project = require('../models/Project');

const getProjectById = (req, res) => {
  res.send('Get Project by ID');
};

const getProjectCountByTech = (req, res) => {
  res.send('Get Project Count by Technology');
};

const getProjectCountByComplexity = (req, res) => {
  res.send('Get Project Count by Complexity');
};

const getProjectTimeline = (req, res) => {
  res.send('Get Project Timeline');
};

const contactForm = (req, res) => {
  res.send('Contact Form Submission');
};

// Get all projects with optional filtering and sorting
async function getProjects(req, res) {
  const { tech, sort } = req.query;
  
  // Create filter object for technology
  let filter = {};
  if (tech && tech !== 'all') {
    filter.technologies = tech;
  }

  // Define sorting options
  let sortOption = {};
  if (sort === 'date') {
    sortOption = { createdAt: -1 };
  } else if (sort === 'complexity') {
    sortOption = { complexity: 1 }; // Adjust based on preference
  }

  try {
    const projects = await Project.find(filter).sort(sortOption);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

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

// Get project metrics for the dashboard
async function getMetrics(req, res) {
  try {
    // Total project count
    const totalProjects = await Project.countDocuments();

    // Complexity breakdown
    const complexityData = await Project.aggregate([
      { $group: { _id: "$complexity", count: { $sum: 1 } } }
    ]);

    // Technology breakdown
    const techData = await Project.aggregate([
      { $unwind: "$technologies" },
      { $group: { _id: "$technologies", count: { $sum: 1 } } }
    ]);

    res.json({ totalProjects, complexityData, techData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
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

exports.getProjectById = async (req, res) => {
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
};


module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectCountByTech,
  getProjectCountByComplexity,
  getProjectTimeline,
  contactForm
};

