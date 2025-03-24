//@ts-check
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import ReadingInsertBox from "../../Results/ReadingInsertBox";

export default function AddtoCollection({
  collection,
  close,
  setShowDatePicker,
}) {
  const [collections, setcollections] = useState([]);
  async function fetchCollections() {
    const res = await axios.get("http://localhost:3001/Collections");
    setcollections(res?.data || []);
  }
  useEffect(() => {
    fetchCollections();
  }, []);

  const [ReadingBook, setReadingBook] = useState(null);

  async function bookInsert(book, table_name) {
    const res = await axios.post(`http://localhost:3001/insertBook`, {
      table_name,
      googleId: book.id,
      title: book.title,
      author: book.authors || [],
      publisher: book.publisher || "",
      publishedDate: book.publishedDate || "",
      description: book.description || "",
      pageCount: book.pageCount || "",
      categories: book.categories|| [],
      thumbnail:book.imageLinks?.thumbnail || book?.thumbnail || "",
      infoLink: book.infoLink,
    });
  }

  function handleclickcollection(table_name) {
    switch (table_name) {
      case "Read":
        setShowDatePicker(collection.id || collection.google_id);
        close();
        break;

      case "Reading":
      setReadingBook(collection) 
      break;

      default:
        bookInsert(collection, table_name);
        close();
        break;
    }
  }
  if(ReadingBook)return <ReadingInsertBox collection={ReadingBook} close={close}/>
  return (
    <>
      <div className="collectionPicker">
        <div className="ExitDiv" onClick={close}>
          <button className="ExitButton">x</button>
        </div>
        <span className="selectionText">Select your collection</span>
        {collections.map((collectionslist) => (
          <button
            className="collectionBtn"
            onClick={() => handleclickcollection(collectionslist.table_name)}
          >
            {collectionslist.table_name}
          </button>
        ))}
      </div>
    </>
  );
}
