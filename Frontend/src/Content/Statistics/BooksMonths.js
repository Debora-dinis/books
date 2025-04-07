//@ts-check
export function booksByMonth(queryData) {
    console.log(queryData)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const bookCounts = Array(12).fill(0);

    queryData.forEach(({ month, book_count }) => {
        const monthIndex = parseInt(month, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
            bookCounts[monthIndex] = book_count;
        }
    });

    return {
        type: "bar",
        data: {
            labels: months,
            datasets: [
                {
                    data: bookCounts,
                    backgroundColor: "#F5877C",
                    borderWidth: 0,
                    hoverBackgroundColor: "#724355",
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: "#FEFCE3ff" },
                    ticks: { color: "#FEFCE3ff", font: { size: 14 } },
                },
                y: {
                    grid: { display: false },
                    ticks: { color: "#FEFCE3ff", font: { size: 12 } },
                },
            },
            hover: { mode: "nearest", intersect: true },
        },
    };
}
