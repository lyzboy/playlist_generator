import React, { useState, useEffect } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";

function App() {
    const [searchValue, setSearchValue] = useState("");

    function handleSearch() {
        console.log(searchValue);
    }
    return (
        <div className="App">
            <h1 id="title">Jamming</h1>
            <SearchBar setSearchValue={setSearchValue} handleSearch={handleSearch}/>
        </div>
    );
}

export default App;
