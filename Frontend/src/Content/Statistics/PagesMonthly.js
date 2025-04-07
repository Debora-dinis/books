//@ts-check
export function pagesByMonth(queryData) {
    console.log(queryData);
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const pageCounts = Array(12).fill(0);

    queryData.forEach(({ month, total_pages }) => {
        const monthIndex = parseInt(month, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
            pageCounts[monthIndex] = total_pages;
        }
    });

    return {
        type: "bar",
        data: {
            labels: months,
            datasets: [
                {
                    data: pageCounts, 
                    backgroundColor: "#F5877C",
                    borderWidth: 0,
                    hoverBackgroundColor: "#724355",
                },
            ],
        },
        options: {
            indexAxis: "x", // Switch to vertical bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "#FEFCE3ff", font: { size: 12 } },
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "#FEFCE3ff" },
                    ticks: { color: "#FEFCE3ff", font: { size: 14 } },
                },
            },
            hover: { mode: "nearest", intersect: true },
        },
    };
}
