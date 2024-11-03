document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch metrics data from the backend
    const response = await fetch('/api/projects/metrics/tech-count'); // Updated URL to match endpoint
    if (!response.ok) throw new Error("Failed to load metrics data.");
    
    const metricsData = await response.json();

    // Check if metricsData is available
    if (!metricsData || metricsData.length === 0) {
      console.error("No technology metrics available.");
      return;
    }

    // Extract technology data for the chart
    const techLabels = metricsData.map(metric => metric._id);
    const techCounts = metricsData.map(metric => metric.count);

    // Create the chart
    const ctx = document.getElementById('projectChart').getContext('2d');
    new Chart(ctx, {
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 // Ensures increments of 1 for project count
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error setting up the chart:", error);
  }
});
