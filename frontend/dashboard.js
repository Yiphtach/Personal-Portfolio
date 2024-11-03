// Function to fetch and render technology distribution chart
async function fetchTechMetrics() {
    try {
      const response = await fetch('/api/projects/metrics/tech-count');
      const data = await response.json();
  
      // Process data for chart
      const techLabels = data.map(item => item._id);
      const techCounts = data.map(item => item.count);
  
      // Render the chart
      new Chart(document.getElementById('techChart'), {
        type: 'bar',
        data: {
          labels: techLabels,
          datasets: [{
            label: 'Projects by Technology',
            data: techCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Projects'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Technology'
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching technology metrics:', error);
    }
  }
  
  // Function to fetch and render complexity distribution chart
  async function fetchComplexityMetrics() {
    try {
      const response = await fetch('/api/projects/metrics/complexity-count');
      const data = await response.json();
  
      // Process data for chart
      const complexityLabels = data.map(item => item._id);
      const complexityCounts = data.map(item => item.count);
  
      // Render the chart
      new Chart(document.getElementById('complexityChart'), {
        type: 'pie',
        data: {
          labels: complexityLabels,
          datasets: [{
            label: 'Projects by Complexity',
            data: complexityCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching complexity metrics:', error);
    }
  }
  
  // Function to fetch and render timeline chart (projects by month/year)
  async function fetchTimelineMetrics() {
    try {
      const response = await fetch('/api/projects/metrics/timeline');
      const data = await response.json();
  
      // Process data for chart
      const timelineLabels = data.map(item => item._id); // Date or Month labels
      const projectCounts = data.map(item => item.count);
  
      // Render the chart
      new Chart(document.getElementById('timelineChart'), {
        type: 'line',
        data: {
          labels: timelineLabels,
          datasets: [{
            label: 'Projects Over Time',
            data: projectCounts,
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Projects'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Timeline'
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching timeline metrics:', error);
    }
  }
  
  // Initialize all charts
  fetchTechMetrics();
  fetchComplexityMetrics();
  fetchTimelineMetrics();
  