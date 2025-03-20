import React, { useState, useEffect } from "react";
import "./style.css";
import Results from "../Results";
import axios from "axios";

export default function Wishlist() {
  const [results, setResults] = useState([]);
  async function fetchWishlist() {
    try {
      const res = await axios.get("http://localhost:3001/Wishlist");
      console.log(res.data)
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }
  useEffect(() => {
    
    console.log("a")
    fetchWishlist();
  }, []); // useEffect runs only once when the component mounts
  if (!results.length)return <div></div>
  return <Results Results={results} type="wishlist" updatepage={fetchWishlist} />;
}
