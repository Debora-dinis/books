//@ts-check

import React, { useState } from "react";
import "./App.css";
import Content from "./Content";
import Sidebar from "./Sidebar";

function App() {
  const [page, setPages] = useState("Statistics");
  return (
    <div className="App">
      <Sidebar setPage={setPages}/>
      <Content page={page} />
    </div>
  );
}

export default App;
