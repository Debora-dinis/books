//@ts-check

import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import Results from "../Results";
export default function () {
  const [results, SetResults] = useState("");
  const [SearchBy, SetSearchBy] = useState("");
  const [startIndex, SetstartIndex] = useState(0);
  const [searchText, SetsearchText] = useState("");
  const inputRef = useRef(null);
  const [totalItems, SetTotalItems] = useState(0);
  async function fetchSearch() {
    if (!inputRef?.current?.value.trim()) return;
    const res = await axios.post("http://localhost:3001/search", {
      Search: !SearchBy
        ? inputRef?.current?.value
        : `${SearchBy}:${inputRef?.current?.value}`,
    });
    console.log(res.data);
    if (res?.data?.items) {
      SetResults(res.data.items);
      SetstartIndex(res.data.items.length);
      SetsearchText(inputRef?.current?.value.trim());
      SetTotalItems(res.data.items.length<20);
    }
  }
  async function fetchMore() {
    console.log(`${SearchBy}:${inputRef?.current?.value}`);
    if (!searchText) return;
    
    const res = await axios.post("http://localhost:3001/search", {
      Search: !SearchBy ? searchText : `${SearchBy}:${searchText}`,
      startIndex,
    });
    console.log(res.data);
    if (res?.data?.items) {
      SetResults((prev) => [...prev, ...res.data.items]);
      SetstartIndex((prev) => prev + res.data.items.length);
      SetTotalItems(res.data.items.length<20);
    }
  }
  if (results) return <Results fetchMore={fetchMore} Results={results} startIndex={startIndex} totalItems={totalItems} />;
  return (
    <div className="SearchBody">
      <img className="LogoImage" src="./logo.png" />
      <img className="LogoFontSearch" src="./LogoFontSearch.png" />
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for Title, Author or ISBN"
          className="SearchBar"
        />
        <button onClick={() => fetchSearch()} className="SearchButton">
          Search
        </button>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <button
          onClick={() => SetSearchBy(SearchBy === "intitle" ? "" : "intitle")}
          className={`RoundButton ${SearchBy === "intitle" ? "Selected" : ""}`}
        ></button>
        <div className="SearchBy">search by title</div>
        <button
          onClick={() => SetSearchBy(SearchBy === "inauthor" ? "" : "inauthor")}
          className={`RoundButton ${SearchBy === "inauthor" ? "Selected" : ""}`}
        ></button>
        <div className="SearchBy">search by author</div>
        <button
          onClick={() => SetSearchBy(SearchBy === "isbn" ? "" : "isbn")}
          className={`RoundButton ${SearchBy === "isbn" ? "Selected" : ""}`}
        ></button>
        <div className="SearchBy">search by ISBN</div>
      </div>
    </div>
  );
}
