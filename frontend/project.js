// Retrieve the project ID from the URL query parameter
const projectId = new URLSearchParams(window.location.search).get('id');

// Fetch project details from the backend
async function fetchProjectDetails() {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    const project = await response.json();

    // Update HTML elements with project data
    document.getElementById('project-title').innerText = project.title;
    document.getElementById('project-description').innerText = project.description;
    document.getElementById('project-technologies').innerText = project.technologies.join(', ');
    document.getElementById('project-timeline').innerText = project.timeline;
    document.getElementById('project-complexity').innerText = project.complexity;
    document.getElementById('project-date').innerText = new Date(project.createdAt).toLocaleDateString();
  } catch (error) {
    console.error('Error fetching project details:', error);
    document.getElementById('project-details').innerHTML = '<p>Failed to load project details.</p>';
  }
}

// Load project details on page load
fetchProjectDetails();
