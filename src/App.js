import React, { useState, useEffect } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";

function App() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className="App">
            <h1 id="title">Jamming</h1>
            <SearchBar />
        </div>
    );
}

export default App;
