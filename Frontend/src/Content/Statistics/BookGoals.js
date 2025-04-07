//@ts-check
export function BookGoals(booksReadThisYear,goalBooks,percentage) {
  return {
    type: "doughnut",
    data: {
      labels: ["Books Read", "Remaining"],
      datasets: [
        {
          data: [
            booksReadThisYear.data[0].books_finished_this_year,
            goalBooks.data[0].books -
              booksReadThisYear.data[0].books_finished_this_year,
          ], // Example: 10 books read out of 100
          backgroundColor: ["#F5877C", "#FEFCE3"], // Read progress & grey background
          borderWidth: 0, // Remove borders
          cutout: "70%", // Makes the inner circle wider
          hoverBackgroundColor: ["#F5877C", "#FEFCE3"], 
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.8, // Wider appearance
      circumference: 180, // Makes it a half-circle
      rotation: -90, // Starts from the left
      plugins: {
        legend: {
          display: false, // Hide legend for a cleaner look
        },
      },
    },
    plugins: [
      {
        id: "innerText",
        afterDraw(chart) {
          const { ctx } = chart;
          const centerX = chart.width / 2;
          const centerY = chart.chartArea.bottom - chart.chartArea.height / 4;

          ctx.save();

          // Draw percentage number (Large, Bold)
          ctx.font = "bold 30px Helvetica";
          ctx.fillStyle = "#F5877C";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${percentage}%`, centerX, centerY - 10); // Adjust position slightly higher

          // Draw label text (Smaller, Gray)
          ctx.font = "16px Helvetica";
          ctx.fillStyle = "#FEFCE3";
          ctx.fillText(`Books Completed`, centerX, centerY + 20); // Adjust position below number
          ctx.restore();
        },
      },
    ],
  };
}
