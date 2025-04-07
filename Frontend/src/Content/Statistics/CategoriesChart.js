//@ts-check
export function categoriesChart(categorydistribution) {
    const labels = categorydistribution.data.map((cat) => cat.category);
    const data = categorydistribution.data.map((cat) => cat.book_count);

    return {
      type: "bar",
      data: {
        labels, // Categories on the y-axis
        datasets: [
          {
            data,
            backgroundColor: "#F5877C", // Bar color
            borderWidth: 0, // Remove borders
            hoverBackgroundColor: "#724355", // Hover color 
          },
        ],
      },
      options: {
        indexAxis: "y", // Horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        scales: {
          x: {
            beginAtZero: true, // Start x-axis at zero
            grid: {
              color: "#FEFCE3ff", // Light grid lines
            },
            ticks: {
              color: "#FEFCE3ff", // X-axis label color
              font: {
                size: 14, // Adjust font size
              },
            },
          },
          y: {
            grid: {
              display: false, // Remove horizontal grid lines
            },
            ticks: {
              color: "#FEFCE3ff", // Y-axis label color
              font: {
                size: 12,
              },
            },
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    };
}
