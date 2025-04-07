//@ts-check

import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { BookGoals } from "./BookGoals";
import { categoriesChart } from "./CategoriesChart";
import { Chart, registerables } from "chart.js";
import { booksByMonth } from "./BooksMonths";
import { pagesByMonth } from "./PagesMonthly";
import { pagesDailyvsGoal } from "./PagesDaily"

Chart.register(...registerables); // Registers all components, including scales

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
    const percentage = Math.round(
      ((booksReadThisYear.data[0].books_finished_this_year || 1) /
        goalBooks.data[0].books) *
        100
    );
    console.log(goalBooks, booksReadThisYear, percentage);
    // Create the gauge chart
    //@ts-ignore
    const myChart = new Chart(
      ctx,
      BookGoals(booksReadThisYear, goalBooks, percentage)
    );

    return myChart;
  }
  async function getcategorydistribution() {
    const categorydistribution = await axios.get(
      "http://localhost:3001/booksByCategory"
    );
    console.log(categorydistribution);
    const ctx = document.getElementById("BookCategories");
    console.log(ctx);
    // Destroy existing chart instance if it exists
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    // Create the bar chart
    const myChart = new Chart(ctx, categoriesChart(categorydistribution));

    return myChart;
  }

  async function getbooksbymonth() {
    const BooksMonthly = await axios.get(
      "http://localhost:3001/BooksMonthly"
    );
    console.log(BooksMonthly);
    const ctx = document.getElementById("booksByMonth");
    console.log(ctx);
    // Destroy existing chart instance if it exists
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    // Create the bar chart
    const myChart = new Chart(ctx, booksByMonth(BooksMonthly.data));

    return myChart;
  }
  async function getpagesbymonth() {
    const PagesMonthly = await axios.get(
      "http://localhost:3001/PagesMonthly"
    );
    console.log(PagesMonthly);
    const ctx = document.getElementById("pagesByMonth");
    console.log(ctx);
    // Destroy existing chart instance if it exists
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    // Create the bar chart
    const myChart = new Chart(ctx, pagesByMonth(PagesMonthly.data));

    return myChart;
  }
  async function getpagesgoal() {
    const PagesDaily = await axios.get(
      "http://localhost:3001/DailyPages"
    );
    const PagesGoal = await axios.get(
      "http://localhost:3001/PageGoal"
    );
    console.log(PagesDaily, PagesGoal);
    const ctx = document.getElementById("pageGoal");
    console.log(ctx);
    // Destroy existing chart instance if it exists
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    // Create the bar chart
    const myChart = new Chart(ctx, pagesDailyvsGoal(PagesDaily.data,PagesGoal.data));

    return myChart;
  }
  useEffect(() => {
    let myChart;
    getpagesgoal().then((res) => {
      myChart = res;
    });
    // Cleanup function to destroy the chart when the component unmounts
    return () => myChart?.destroy();
  }, []);
  useEffect(() => {
    let myChart;
    getpagesbymonth().then((res) => {
      myChart = res;
    });
    // Cleanup function to destroy the chart when the component unmounts
    return () => myChart?.destroy();
  }, []);
  useEffect(() => {
    let myChart;
    getbooksbymonth().then((res) => {
      myChart = res;
    });
    // Cleanup function to destroy the chart when the component unmounts
    return () => myChart?.destroy();
  }, []);

  useEffect(() => {
    let myChart;
    getcategorydistribution().then((res) => {
      myChart = res;
    });
    // Cleanup function to destroy the chart when the component unmounts
    return () => myChart?.destroy();
  }, []);

  useEffect(() => {
    let myChart;
    getpercentagegoalbooks().then((res) => {
      myChart = res;
    });
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
    <div style={{overflow:"hidden"}}>
      <div className="header">
        <div className="title">Dashboard</div>
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
      <div>
        <div className="kpisDiv">
          <div className="gauge">
            <div className="charttitle"> Yearly book goal</div>
            <canvas id="BookGoals"></canvas>
          </div>
          <div className="kpi">
            <div className="kpititle">Reading streak</div>
            <div className="kpivalue">0</div>
          </div>
          <div className="kpi">
            <div className="kpititle">Total books read</div>
            <div className="kpivalue">{ReadBooks}</div>
          </div>
          <div className="kpi">
            <div className="kpititle">Books to read</div>
            <div className="kpivalue">{ToReadBooks}</div>
          </div>
          <div className="kpi">
            <div className="kpititle">Wishlisted books</div>
            <div className="kpivalue">{WishlistedBooks}</div>
          </div>
        </div>
        <div className="chartscontainer">
          <div className="horizontalbarchart">
            <div className="charttitle"> Book distribution by category</div>
            <canvas id="BookCategories"></canvas>
          </div>
          <div className="verticalbarcharts">
            <div className="verticalbarchart" style={{height:"30vh", paddingBottom:"2vh"}}>
              <div className="charttitle"> Pages Read vs Reading Goal</div>
              <canvas id="pageGoal"></canvas>
            </div>
            <div className="verticalbarchart">
              <div className="charttitle"> Pages read by month</div>
              <canvas id="pagesByMonth"></canvas>
            </div>
          </div>
          <div className="horizontalbarchart" style={{height:"60vh", marginTop:"1vh", width:"22vw"}}>
            <div className="charttitle"> Books read by month</div>
            <canvas id="booksByMonth"></canvas>
          </div>
          </div>
        </div>
      </div>
  
  );
}
