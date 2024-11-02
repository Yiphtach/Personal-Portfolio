// Load the header dynamically
async function loadHeader() {
  try {
    const response = await fetch('components/header.html');
    if (!response.ok) throw new Error("Failed to load header.");
    const data = await response.text();
    document.body.insertAdjacentHTML('afterbegin', data);
  } catch (error) {
    console.error(error);
  }
}

// Fetch and display projects with optional filter and sort parameters
async function fetchProjects(filter = null, sort = 'createdAt', order = 'desc') {
  try {
    let url = 'http://localhost:3000/projects';

    // Append query parameters for filtering and sorting
    const params = new URLSearchParams();
    if (filter) params.append('technology', filter);
    if (sort) params.append('sortBy', sort);
    if (order) params.append('order', order);
    url += `?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch projects.");

    const projects = await response.json();

    // Display projects
    const projectContainer = document.getElementById('projects');
    projectContainer.innerHTML = '';
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="view-details" data-id="${project._id}">View Details</button>
      `;
      projectContainer.appendChild(projectCard);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  fetchProjects(); // Initial fetch with default sort parameters

  // Filter buttons
  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      fetchProjects(filter); // Pass filter, use default sort and order
    });
  });

  // Sort buttons
  document.querySelectorAll('.sort-button').forEach(button => {
    button.addEventListener('click', () => {
      const sort = button.getAttribute('data-sort');
      const order = button.getAttribute('data-order');
      fetchProjects(null, sort, order); // Pass sort and order, use current filter
    });
  });
});
