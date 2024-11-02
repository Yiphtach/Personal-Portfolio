document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:3000/projects/metrics');
  const metricsData = await response.json();

  if (!metricsData) {
    console.error("Failed to load metrics data.");
    return;
  }

  // Extract technology data for the chart
  const techLabels = metricsData.techMetrics.map(metric => metric._id);
  const techCounts = metricsData.techMetrics.map(metric => metric.count);

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
});
