//@ts-check

import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Chart, DoughnutController, ArcElement } from "chart.js";

Chart.register(DoughnutController, ArcElement);

export default function Dashboard() {
  // Get number of read books
  const [ReadBooks, setReadBooks] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/KPIRead").then((res) => {
      setReadBooks(res.data.count);
    });
  }, []);
  async function getpercentagegoalbooks() {
    const [booksReadThisYear, goalBooks] = await Promise.all([
      axios.get("http://localhost:3001/BooksReadThisYear"),
      axios.get("http://localhost:3001/bookGoalGet"),
    ]);
    const ctx = document.getElementById("BookGoals");

    // Destroy existing chart instance if it exists
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Book reading progress values
    const percentage = Math.round(((booksReadThisYear.data[0].books_finished_this_year || 1) / goalBooks.data[0].books) * 100);
    console.log(goalBooks,booksReadThisYear, percentage)
    // Create the gauge chart
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Books Read", "Remaining"],
        datasets: [
          {
            data: [booksReadThisYear.data[0].books_finished_this_year, goalBooks.data[0].books - booksReadThisYear.data[0].books_finished_this_year], // Example: 10 books read out of 100
            backgroundColor: ["#F5877C", "#FEFCE3"], // Read progress & grey background
            borderWidth: 0, // Remove borders
            cutout: "70%", // Makes the inner circle wider
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
    });
    return myChart;
  }
  useEffect(() => {
      let myChart;
     getpercentagegoalbooks().then((res)=>{
      myChart=res;
     })
    // Cleanup function to destroy the chart when the component unmounts
    return () => myChart?.destroy();
  }, []);

  // Get number of to-read books
  const [ToReadBooks, setToReadBooks] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/KPItoRead").then((res) => {
      setToReadBooks(res.data.count);
    });
  }, []);

  // Get number of wishlisted books
  const [WishlistedBooks, setWishlistedBooks] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/KPIWishlisted").then((res) => {
      setWishlistedBooks(res.data.count);
    });
  }, []);

  // State for showing options panel
  const [showOptions, setShowOptions] = useState(false);
  const [bookGoal, setBookGoal] = useState("");
  const [pageGoal, setPageGoal] = useState("");

  // Dashboard page selection state
  const [DashboardPage, setDashboardPage] = useState("Dashboard");

  // Update daily page goal
  async function updatePageGoal() {
    if (!pageGoal) return;
    axios.post("http://localhost:3001/GoalPages", { pages: pageGoal });
  }

  // Update yearly book goal
  async function updateBookGoal() {
    if (!bookGoal) return;
    axios.post("http://localhost:3001/GoalBooks", { books: bookGoal });
  }

  return (
    <div>
      <div className="header">
        {/* Dropdown Menu */}
        <div className="dropdown">
          <div className="title"> {DashboardPage} </div>
          <div className="dropdown-content">
            <button onClick={() => setDashboardPage("Dashboard")}>
              Dashboard
            </button>
            <button onClick={() => setDashboardPage("Reading")}>Reading</button>
          </div>
        </div>

        {/* Settings Button */}
        <button
          className="optionsBtn"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <img
            className="optionsBtnImg"
            src="././settings.png"
            alt="Settings"
          />
        </button>
      </div>

      {/* Options Panel */}
      {showOptions && (
        <div className="optionsPanel">
          <div className="ExitDiv">
            <button
              className="ExitButton"
              onClick={() => setShowOptions(false)}
            >
              x
            </button>
          </div>
          <div className="inputContainer">
            <div className="inputText">Yearly book reading goal</div>
            <input
              style={{ marginLeft: "-6vw", width: "15vw" }}
              className="inputDiv"
              type="number"
              placeholder="Enter your book reading goal"
              value={bookGoal}
              onChange={(e) => setBookGoal(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <div className="inputText">Daily page reading goal</div>
            <input
              style={{ marginLeft: "-5vw", width: "15vw" }}
              className="inputDiv"
              type="number"
              placeholder="Enter your page reading goal"
              value={pageGoal}
              onChange={(e) => setPageGoal(e.target.value)}
            />
          </div>
          <button
            className="saveBtnReading"
            onClick={() => {
              updatePageGoal();
              updateBookGoal();
              setShowOptions(false);
            }}
          >
            Save
          </button>
        </div>
      )}

      {/* Conditional Rendering Based on Selected Page */}
      {DashboardPage === "Dashboard" ? (
        <div>
          <div className="kpisDiv">
            <div className="kpi">
              <div className="kpititle">Reading streak</div>
              <div className="kpivalue">0</div>
            </div>
            <div className="kpi">
              <div className="kpititle">Total books read</div>
              <div className="kpivalue">{ReadBooks}</div>
            </div>
            <div className="kpi">
              <div className="kpititle">No of books to read</div>
              <div className="kpivalue">{ToReadBooks}</div>
            </div>
            <div className="kpi">
              <div className="kpititle">Wishlisted books</div>
              <div className="kpivalue">{WishlistedBooks}</div>
            </div>
          </div>
          <div className="chartscontainer">
            <div className="gauges">
              <div className="gauge">
                <canvas id="BookGoals"></canvas>
              </div>
              <div className="gauge"></div>
            </div>
            <div className="verticalbarcharts">
              <div className="verticalbarchart"></div>
              <div className="verticalbarchart"></div>
            </div>
            <div className="horizontalbarchart"></div>
          </div>
        </div>
      ) : (
        <div className="reading-books-content">
          <h2>Reading Books Section</h2>
          
        </div>
      )}
    </div>
  );
}
