import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FlavorList from "./Components/flavorList";
import Search from "./Components/flavorSearch";

function App() {
  return (
    <div className="App">
      {/* <FlavorList /> */}
      <Search />
    </div>
  );
}

export default App;
