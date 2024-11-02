// Fetch and display the project details
async function fetchProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
  
    if (!projectId) {
      document.getElementById('project-title').innerText = 'Project not found.';
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}`);
      if (!response.ok) throw new Error('Failed to load project details.');
  
      const project = await response.json();

      // Populate project details in the DOM
      document.getElementById('project-title').innerText = project.title || 'No title available';
      document.getElementById('project-description').innerText = project.description || 'No description available';
      document.getElementById('project-technologies').innerText = project.technologies && project.technologies.length > 0 
        ? project.technologies.join(', ') 
        : 'No technologies listed';
      document.getElementById('project-timeline').innerText = project.timeline || 'No timeline available';
      document.getElementById('project-complexity').innerText = project.complexity || 'No complexity level specified';
      document.getElementById('project-days').innerText = project.daysSinceCreation 
        ? `${project.daysSinceCreation} days ago` 
        : 'Creation date not available';
      
    } catch (error) {
      console.error("Error loading project details:", error);
      document.getElementById('project-title').innerText = 'Error loading project details.';
      document.getElementById('project-description').innerText = 'Please try again later.';
    }
}
  
document.addEventListener('DOMContentLoaded', fetchProjectDetails);
