//@ts-check
export function pagesDailyvsGoal(queryData, pageGoal) {
  console.log("Query Data:", queryData);
  console.log("Page Goal:", pageGoal);

  const goal = pageGoal?.[0]?.pages || 0;

  // 1. Get current date info
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  // 2. Calculate how many days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 3. Build full day labels (["01", "02", ..., "31"])
  const dayLabels = Array.from({ length: daysInMonth }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  // 4. Build a map of query data for fast lookup
  const pagesByDay = {};
  queryData.forEach(({ day, total_pages }) => {
    pagesByDay[day] = total_pages;
  });

  // 5. Build pagesRead array with 0s for missing days
  const pagesRead = dayLabels.map((day) => pagesByDay[day] || 0);

  // 6. Build constant goal line
  const goalLine = Array(daysInMonth).fill(goal);

  return {
    type: "line",
    data: {
      labels: dayLabels,
      datasets: [
        {
          label: "Pages Read",
          data: pagesRead,
          borderColor: "#F5877C",
          backgroundColor: "transparent",
          borderWidth: 2,
          fill: false,
          pointRadius: 0.1,
          pointHoverRadius: 4,
          pointBackgroundColor: "#F5877C",
          tension: 0.4,
        },
        {
          label: "Page Goal",
          data: goalLine,
          borderColor: "#F5877C",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          grid: { color: "#FEFCE3ff", display: false },
          ticks: { color: "#FEFCE3ff", font: { size: 14 } },
        },
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...pagesRead, goal) + 10,
          grid: { color: "#FEFCE3ff" },
          ticks: { color: "#FEFCE3ff", font: { size: 12 } },
        },
      },
      hover: { mode: "nearest", intersect: true },
    },
  };
}
