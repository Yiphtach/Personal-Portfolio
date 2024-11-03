// Fetch and display projects with optional filtering and sorting
async function fetchProjects() {
  // Get filter and sort options from the UI
  const techFilter = document.getElementById('tech-filter').value;
  const sortOption = document.getElementById('sort-options').value;

  try {
    // Construct the query string based on filter and sort options
    let query = `/api/projects?`;
    if (techFilter && techFilter !== 'all') query += `tech=${encodeURIComponent(techFilter)}&`;
    if (sortOption) query += `sort=${encodeURIComponent(sortOption)}`;

    // Fetch projects from the API
    const response = await fetch(query);
    if (!response.ok) throw new Error('Failed to fetch projects');
    const projects = await response.json();

    // Display the projects in the project list container
    const projectContainer = document.getElementById('project-list');
    projectContainer.innerHTML = ''; // Clear existing projects
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
        <p><strong>Timeline:</strong> ${project.timeline}</p>
        <p><strong>Complexity:</strong> ${project.complexity}</p>
      `;
      projectContainer.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    const projectContainer = document.getElementById('project-list');
    projectContainer.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
  }
}

// Event listeners for filtering and sorting
document.getElementById('tech-filter').addEventListener('change', fetchProjects);
document.getElementById('sort-options').addEventListener('change', fetchProjects);


// Initial fetch to display projects when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects);