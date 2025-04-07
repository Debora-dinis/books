//@ts-check
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";
import "./style.css";

export default function ReadingInsertBox({ collection, close }) {
  const [startDate, setStartDate] = useState("");
  const [pagesRead, setPagesRead] = useState("0");
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (datepickerRef.current) {
      new AirDatepicker(datepickerRef.current, {
        onSelect: ({ date }) => setStartDate(date.toString().split("T")[0]),
        locale: localeEn,
        dateFormat: "yyyy-MM-dd"
      });
      
    }
  }, []);

  async function bookInsert(book) {
    const res = await axios.post(`http://localhost:3001/Reading`, {
      googleId: book.id || book.google_id,
      title: book.title,
      author: book.authors || [],
      publisher: book.publisher || "",
      publishedDate: book.publishedDate || "",
      description: book.description || "",
      pageCount: book.pageCount || "",
      categories: book.categories || [],
      thumbnail: book.imageLinks?.thumbnail || book?.thumbnail || "",
      infoLink: book.infoLink,
      startDate: startDate || null,
      pagesRead: parseInt(pagesRead) || null,
    });
    close()
  }

  return (
    <>
      <div className="collectionPicker">
        <div className="ExitDiv" onClick={close}>
          <button className="ExitButton">x</button>
        </div>
        <div style={{ marginTop: "4vh" }}>
          <span className="inputText">Started reading on</span>
          <input
            className="inputDiv"
            type="text"
            ref={datepickerRef}
            placeholder="Select date"
            readOnly
          />
        </div>
        <div style={{ marginTop: "2vh" }}>
          <span className="inputText">No of pages read</span>
          <input
            className="inputDiv"
            type="number"
            placeholder="No of pages"
            value={pagesRead}
            onChange={(e) => setPagesRead(e.target.value)}
          />
        </div>
        <button
          className="saveBtnReading"
          onClick={() => bookInsert(collection)}
        >
          {" "}
          Save{" "}
        </button>
      </div>
    </>
  );
}
