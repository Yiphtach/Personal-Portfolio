const Project = require('../models/Project'); // Adjusted path to the Project model

// Create a new project
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: "Failed to create project", error });
  }
};

// Get all projects with optional filters and sorting
const getProjects = async (req, res) => {
  try {
    // Extract query parameters for filtering and sorting
    const { technology, complexity, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Construct filter object for technology and complexity
    const filter = {};
    if (technology) filter.technologies = technology; // Filter by technology (e.g., JavaScript)
    if (complexity) filter.complexity = complexity;    // Filter by complexity (e.g., High)

    // Define sort options based on query parameters
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    // Fetch projects with applied filters and sorting
    const projects = await Project.find(filter).sort(sortOptions);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};

// Get project metrics by technology and complexity
const getProjectMetrics = async (req, res) => {
  try {
    // Aggregate project count by technology
    const techMetrics = await Project.aggregate([
      { $unwind: "$technologies" }, // Flatten technologies array
      { $group: { _id: "$technologies", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Aggregate project count by complexity
    const complexityMetrics = await Project.aggregate([
      { $group: { _id: "$complexity", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ techMetrics, complexityMetrics });
  } catch (error) {
    console.error("Error fetching project metrics:", error);
    res.status(500).json({ message: "Failed to fetch project metrics", error });
  }
};

// Export all controller functions
module.exports = { createProject, getProjects, getProjectMetrics };
