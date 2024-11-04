async function fetchGitHubProjects() {
  try {
    const response = await fetch('http://localhost:3000/projects/github');
    const projects = await response.json();
    displayProjects(projects); // Reuse display function for consistent UI
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
  }
}


// Fetch and display projects with optional filtering and sorting
async function fetchProjects() {
  // Get filter and sort options from the UI
  const techFilter = document.getElementById('tech-filter').value;
  const complexityFilter = document.getElementById('complexity-filter').value;
  const sortOption = document.getElementById('sort-options').value; // Updated to match ID in HTML

  try {
    // Construct the query string based on filter and sort options
    let query = '/api/projects?';
    if (techFilter && techFilter !== 'all') query += `tech=${encodeURIComponent(techFilter)}&`;
    if (complexityFilter && complexityFilter !== 'all') query += `complexity=${encodeURIComponent(complexityFilter)}&`;
    if (sortOption) query += `sort=${encodeURIComponent(sortOption)}`;

    // Fetch projects from the API
    const response = await fetch(query);
    if (!response.ok) throw new Error('Failed to fetch projects');
    const projects = await response.json();

    // Render the projects in the project list container
    renderProjects(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    const projectContainer = document.getElementById('projects-container');
    projectContainer.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
  }
}

// Render projects in the project container
function renderProjects(projects) {
  const projectContainer = document.getElementById('projects-container');
  projectContainer.innerHTML = ''; // Clear existing projects

  if (projects.length === 0) {
    projectContainer.innerHTML = '<p>No projects match the selected criteria.</p>';
    return;
  }
  
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.classList.add('project-card');
    
    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
      <p><strong>Timeline:</strong> ${project.timeline}</p>
      <p><strong>Complexity:</strong> ${project.complexity}</p>
      <a href="project.html?id=${project._id}">View More</a>
    `;
    projectContainer.appendChild(projectCard);
  });
}

// Event listeners for filtering and sorting
document.getElementById('tech-filter').addEventListener('change', fetchProjects);
document.getElementById('complexity-filter').addEventListener('change', fetchProjects);
document.getElementById('sort-options').addEventListener('change', fetchProjects); // Updated to match ID in HTML

// Initial fetch to display projects when the page loads
fetchProjects();
