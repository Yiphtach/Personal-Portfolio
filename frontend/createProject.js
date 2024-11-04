// Handle form submission for creating a new project
document.getElementById('new-project-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    // Get form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const technologies = document.getElementById('technologies').value.split(',').map(tech => tech.trim()); // Split and trim technologies
    const timeline = document.getElementById('timeline').value;
    const complexity = document.getElementById('complexity').value;
  
    try {
      // Send a POST request to the backend to create a new project
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          technologies,
          timeline,
          complexity
        })
      });
  
      // Handle the response
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('response-message').innerHTML = '<p>Project created successfully!</p>';
        document.getElementById('new-project-form').reset(); // Clear the form
      } else {
        throw new Error(result.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      document.getElementById('response-message').innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
    }
  });
  