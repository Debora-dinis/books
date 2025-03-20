//@ts-check

import React from "react";
import "./style.css";
export default function ({ bookinfo, setbook }) {
  return (
    <div className="InfoBox">
      <div>
        {" "}
        <button onClick={() => setbook(null)} className="ExitButton">
          x
        </button>{" "}
      </div>
      <div style={{ display: "flex" }}>
        {bookinfo?.imageLinks?.thumbnail || bookinfo?.thumbnail? (
          <img
            className="InfoBookCover"
            src={bookinfo.imageLinks?.thumbnail || bookinfo?.thumbnail}
          ></img>
        ) : (
          <div className="InfoNoImage">No image available</div>
        )}
        <div>
          <div className="MoreInfoTitle">{bookinfo.title}</div>
          <div className="MoreInfoAuthor">{bookinfo.authors}</div>
          {bookinfo.infoLink && (
            <button className="GoogleBooksButton" onClick={()=>window.open(bookinfo.infoLink)}>
             Open in Google Books
            </button>
          )}
        </div>
      </div>
      <div className="MoreInfoDescription">{bookinfo.description}</div>
      <div className="MoreDetailsBox">
      <div style={{ display: "flex", flexDirection:"column", marginLeft:"2vw" }}>
          {bookinfo.publisher && (
            <div className="MoreInfoDetails">
              <b>Publisher: </b> <div className="DetailText">{bookinfo.publisher}</div>
            </div>
          )}
          {bookinfo.publishedDate && (
            <div className="MoreInfoDetails">
              <b>Published in: </b> <div className="DetailText">{bookinfo.publishedDate}</div>
            </div>
          )}
          {bookinfo.pageCount && (
            <div className="MoreInfoDetails">
              <b>Page count: </b> <div className="DetailText">{bookinfo.pageCount}</div>
            </div>
          )}
          {bookinfo.categories && (
            <div className="MoreInfoDetails">
              <b>Categories: </b> <div className="DetailText">{bookinfo.categories}</div>
            </div>
          )}
          </div>
      </div>
    </div>
  );
}
