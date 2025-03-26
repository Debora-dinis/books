//@ts-check

import React, { useEffect, useState } from "react";
import "./style.css";
import Bookinfo from "./Bookinfo";
import axios from "axios";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";
import AddtoCollection from "../Collection/Addtocollection/Addtocollection";
export default function ({
  Results,
  fetchMore,
  startIndex,
  totalItems,
  type = "search",
  updatepage,
  setResults,
}) {
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [Selected, Setselected] = useState(null);
  const[collectiontoadd,Setcollectiontoadd]=useState(null);
  useEffect(() => {
    if (showDatePicker) {
      new AirDatepicker("#start-date", {
        onSelect({ formattedDate }) {
          setDates((prev) => ({ ...prev, startDate: formattedDate }));
        },
        locale: localeEn,
        dateFormat: "yyyy-MM-dd"
      });

      new AirDatepicker("#end-date", {
        onSelect({ formattedDate }) {
          setDates((prev) => ({ ...prev, endDate: formattedDate }));
        },
        locale: localeEn,
        dateFormat: "yyyy-MM-dd"
      });
    }
  }, [showDatePicker]);
  async function readInsert(book, id) {
    const res = await axios.post("http://localhost:3001/Read", {
      googleId: id,
      title: book.title,
      authors: book.authors || [""],
      publisher: book.publisher || "",
      publishedDate: book.publishedDate || "",
      description: book.description || "",
      pageCount: book.pageCount || "",
      categories: book.categories || [""],
      thumbnail: book.imageLinks?.thumbnail || book?.thumbnail || "",
      infoLink: book.infoLink,
      startDate: dates.startDate || "",
      endDate: dates.endDate || "",
    });
    setShowDatePicker(null);
  }
  async function addtowishlist(book, id) {
    const res = await axios.post("http://localhost:3001/Wishlist", {
      googleId: id,
      title: book.title,
      authors: book.authors || [""],
      publisher: book.publisher || "",
      publishedDate: book.publishedDate || "",
      description: book.description || "",
      pageCount: book.pageCount || "",
      categories: book.categories || [""],
      thumbnail: book.imageLinks?.thumbnail || "",
      infoLink: book.infoLink,
    });
  }
  async function removetowishlist(id) {
    const res = await axios.delete("http://localhost:3001/Wishlist/" + id);
    updatepage();
  }

  async function bookRemove(id, table_name) {
    const res = await axios.delete(
      `http://localhost:3001/removeBook/${id}/${table_name}`
    );
    updatepage();
  }

  function drawCardButtons(info, id, savedInfo) {
    switch (type) {
      case "search":
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "12px",
              width: "90%",
              justifyContent: "right",
            }}
          >
            {" "}
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => addtowishlist(info, id)}
              >
                {" "}
                <img className="CardButtonImage" src="./wishlist.png" />
              </button>
              <span className="tooltipText">Add to wishlist</span>
            </div>
            <div className="CardButtonTooltip">
              <button className="CardButton" onClick={()=>Setcollectiontoadd({...info,id})}>
                {" "}
                <img className="CardButtonImage" src="./collection.png" />
              </button>
              <span className="tooltipText">Add to a collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => {
                  setShowDatePicker(id);
                }}
              >
                {" "}
                <img className="CardButtonImage" src="./read.png" />
              </button>
              <span className="tooltipText">Already read</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                onClick={() => Setselected(info || savedInfo)}
                className="CardButton"
              >
                {" "}
                <img className="CardButtonImage" src="./information.png" />
              </button>
              <span className="tooltipText">More information</span>
            </div>
          </div>
        );

      case "Reading":
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "12px",
              width: "90%",
              justifyContent: "right",
            }}
          >
            {" "}
            <div className="CardButtonTooltip">
              <button className="CardButton">
                {" "}
                <img className="CardButtonImage" src="./stats.png" />
              </button>
              <span className="tooltipText">
                View reading progress in the dashboard
              </span>
            </div>
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => bookRemove(savedInfo.google_id,"Reading")}
              >
                {" "}
                <img className="CardButtonImage" src="./delete.png" />
              </button>
              <span className="tooltipText">Remove book from collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => {
                  setShowDatePicker(savedInfo.google_id);
                }}
              >
                {" "}
                <img className="CardButtonImage" src="./read.png" />
              </button>
              <span className="tooltipText">Already read</span>
            </div>
            <div className="CardButtonTooltip">
              <button className="CardButton">
                {" "}
                <img className="CardButtonImage"  onClick={()=>Setcollectiontoadd({...info,id})} src="./collection.png" />
              </button>
              <span className="tooltipText">Add to a collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                onClick={() => Setselected(info || savedInfo)}
                className="CardButton"
              >
                {" "}
                <img className="CardButtonImage" src="./information.png" />
              </button>
              <span className="tooltipText">More information</span>
            </div>
          </div>
        );

      case "Read":
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "12px",
              width: "90%",
              justifyContent: "right",
            }}
          >
            {" "}
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => bookRemove(savedInfo.google_id,"Read")}
              >
                {" "}
                <img className="CardButtonImage" src="./delete.png" />
              </button>
              <span className="tooltipText">Remove book from collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button className="CardButton">
                {" "}
                <img className="CardButtonImage" onClick={()=>Setcollectiontoadd({...info,id})} src="./collection.png" />
              </button>
              <span className="tooltipText">Add to a collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                onClick={() => Setselected(info || savedInfo)}
                className="CardButton"
              >
                {" "}
                <img className="CardButtonImage" src="./information.png" />
              </button>
              <span className="tooltipText">More information</span>
            </div>
          </div>
        );

      case "Wishlist":
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "12px",
              width: "90%",
              justifyContent: "right",
            }}
          >
            {" "}
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => removetowishlist(savedInfo.google_id)}
              >
                {" "}
                <img className="CardButtonImage" src="./delete.png" />
              </button>
              <span className="tooltipText">Remove from wishlist</span>
            </div>
            <div className="CardButtonTooltip">
              <button className="CardButton">
                {" "}
                <img className="CardButtonImage" onClick={()=>Setcollectiontoadd({...savedInfo,id})}  src="./collection.png" />
              </button>
              <span className="tooltipText">Add to a collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => {
                  setShowDatePicker(savedInfo.google_id);
                }}
              >
                {" "}
                <img className="CardButtonImage" src="./read.png" />
              </button>
              <span className="tooltipText">Already read</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                onClick={() => Setselected(info || savedInfo)}
                className="CardButton"
              >
                {" "}
                <img className="CardButtonImage" src="./information.png" />
              </button>
              <span className="tooltipText">More information</span>
            </div>
          </div>
        );

      default:
        return (
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "12px",
              width: "90%",
              justifyContent: "right",
            }}
          >
            {" "}
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => bookRemove(savedInfo.google_id, type)}
              >
                {" "}
                <img className="CardButtonImage" src="./delete.png" />
              </button>
              <span className="tooltipText">Remove from collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button className="CardButton">
                {" "}
                <img className="CardButtonImage" onClick={()=>Setcollectiontoadd({...info,id})} src="./collection.png" />
              </button>
              <span className="tooltipText">Add to a collection</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                className="CardButton"
                onClick={() => {
                  setShowDatePicker(savedInfo.google_id);
                }}
              >
                {" "}
                <img className="CardButtonImage" src="./read.png" />
              </button>
              <span className="tooltipText">Already read</span>
            </div>
            <div className="CardButtonTooltip">
              <button
                onClick={() => Setselected(info || savedInfo)}
                className="CardButton"
              >
                {" "}
                <img className="CardButtonImage" src="./information.png" />
              </button>
              <span className="tooltipText">More information</span>
            </div>
          </div>
        );
    }
  }
  return (
    <div className="ResultsBody">
      {type=="search" && <div className="ReturnBtnDiv">
        <button onClick={()=>setResults(null)} className="ReturnBtn">
        <img className="ReturnBtnImg" src="./return.png"></img>
        <span className="Returntooltip">Refresh Search</span>
        </button>
      </div>}
      {Results?.map(({ id, volumeInfo: info, ...savedInfo }) => (
        <div className="ResultCard">
          {" "}
          {info?.imageLinks?.thumbnail || savedInfo?.thumbnail ? (
            <img
              className="BookCover"
              src={info?.imageLinks?.thumbnail || savedInfo?.thumbnail}
            ></img>
          ) : (
            <div className="NoImage">No image available</div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <div key={id} className="CardTitle">
              {info?.title || savedInfo?.title}
            </div>
            <div key={id} className="CardAuthor">
              <i>{info?.authors || savedInfo?.authors}</i>
            </div>
          </div>
          {drawCardButtons(info, id, savedInfo)}
          {showDatePicker == (id || savedInfo.google_id) && (
            <div className="date-picker-container">
              <button
                className="dateExitButton"
                onClick={() => {
                  setShowDatePicker(null);
                }}
              >
                x
              </button>
              <div className="inputContainer">
                <label className="dateLabel">Start Date</label>
                <input
                  className="dateInput"
                  type="text"
                  id="start-date"
                  readOnly
                />
                <label className="dateLabel">End Date</label>
                <input
                  className="dateInput"
                  type="text"
                  id="end-date"
                  readOnly
                />
              </div>
              <button
                className="saveBtn"
                onClick={() => {
                  readInsert(info || savedInfo, id || savedInfo.google_id);
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      ))}

      {!totalItems && type == "search" && (
        <button className="MoreButton" onClick={fetchMore}>
          Load More
        </button>
      )}

      {Selected && <Bookinfo bookinfo={Selected} setbook={Setselected} />}
      {collectiontoadd&&<AddtoCollection collection={collectiontoadd} close={()=>Setcollectiontoadd(null)} setShowDatePicker={setShowDatePicker}/>}
    </div>
  );
}
