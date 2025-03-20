//@ts-check

import React from "react";
import "./style.css";
import Search from "./Search";
import Wishlist from "./Wishlist";
import Collection from "./Collection";
import Statistics from "./Statistics";
export default function ({ page }) {
  return (
    <div className="Content">
      {page == "Search" && <Search />}
      {page == "Wishlist" && <Wishlist />}
      {page == "Collection" && <Collection />}
      {page == "Statistics" && <Statistics />}
    </div>
  );
}
