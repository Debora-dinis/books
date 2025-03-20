//@ts-check
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Results from "../Results";

export default function UpperBar() {
  const [showInput, setShowInput] = useState(false);
  const [tableName, setTableName] = useState(""); // Stores the input value
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [collections, listcollections] = useState([]); // Controls empty popup visibility
  const [selectCollection, setSelectedCollection] = useState("");
  const [collectionBooks, setCollectionBooks] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false); //Controls duplicate popup visibility

  // Handles input change
  const handleInputChange = (event) => {
    setTableName(event.target.value);
  };

  // Handles submit button click
  const fetchCollections = async () => {
    const res = await axios.get("http://localhost:3001/Collections");
    listcollections(res?.data || []);
  };
  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (!selectCollection) return;
    axios
      .post("http://localhost:3001/listCollectionBooks", {
        table_name: selectCollection.trim(),
      })
      .then((res) => {
        setCollectionBooks(res?.data || []);
      });
  }, [selectCollection]);

  // Handles submit button click
  const handleSubmit = async () => {
    if (!tableName.trim()) {
      setShowPopup(true); // Show popup if input is empty
      return;
    }
    // Check if the collection already exists
  const collectionExists = collections.some(
    (collection) => collection.table_name.toLowerCase() === tableName.trim().toLowerCase()
  );

  if (collectionExists) {
    setShowDuplicatePopup(true); // Show popup if name already exists
    return;
  }
    await axios.post("http://localhost:3001/CreateCollection", {
      table_name: tableName.trim(),
    });
    setShowInput(false); // Hides the input div after submission
    setTableName(""); // Clears input field
    fetchCollections();
  };
  return (
    <>
      <div className="upperBar">
        <div className="dropdown">
          <button className="dropbtn">Collections</button>
          <div className="dropdown-content">
            {collections.map((collection) => (
              <button
                onClick={() => setSelectedCollection(collection.table_name)}
                className="collectionbtn"
              >
                {collection.table_name}
              </button>
            ))}
          </div>
        </div>

        <div
          className="tooltip-container"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowInput(true)}
        >
          <button className="createbtn">
            <img className="CardButtonImage" src="./add.png" />
          </button>
          {showTooltip && (
            <span className="tooltipTextCreateBtn">
              Create a new collection
            </span>
          )}
        </div>

        {showInput && (
          <div className="inputCollection">
            <button onClick={() => setShowInput(false)} className="closeBtn">X</button>
            <input
              type="text"
              className="collectionName"
              placeholder="Enter the name of the collection..."
              value={tableName}
              onChange={handleInputChange}
            />
            <button className="submitBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}

        {/* Popup Notification */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Please provide a name for your collection.</p>
              <button onClick={() => setShowPopup(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
      {/* Duplicate Name Popup Notification */}
      {showDuplicatePopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              That collection already exists. Please choose a
              different name.
            </p>
            <button onClick={() => setShowDuplicatePopup(false)}>OK</button>
          </div>
        </div>
      )}
      <Results
        Results={collectionBooks}
        fetchMore={undefined}
        startIndex={undefined}
        totalItems={undefined}
        updatepage={undefined}
        type="collection"
      ></Results>
    </>
  );
}
