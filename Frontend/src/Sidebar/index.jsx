//@ts-check

import React from "react";
import "./style.css";
export default function ({ setPage }) {
  const pages = [
    { title: "Search", page: "Search" },
    { title: "Wishlist", page: "Wishlist" },
    { title: "Collection", page: "Collection" },
    { title: "Statistics", page: "Statistics" },
  ];

  console.log(setPage)
  return (
    <div className="Sidebar">
     <div style={{display: "flex", alignContent:"center"}}> <img className="LogoImageSideBar" src="./logo.png" />
     <img className="LogoFontSideBar" src="./LogoFontSideBar.png" /></div>
      {pages.map((page) => (
        <button onClick={() => setPage(page.page)} className="MenuButton">
          {page.title}
        </button>
      ))}
    </div>
  );
}
