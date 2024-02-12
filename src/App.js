import React, { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

import styles from "./App.module.css";

const results = [
    {
        name: "Name 1",
        artist: "Artist 1",
        album: "Album 1",
    },
    {
        name: "Name 2",
        artist: "Artist 2",
        album: "Album 2",
    },
    {
        name: "Name 3",
        artist: "Artist 3",
        album: "Album 3",
    },
];

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    function handleSearch() {
        console.log(searchValue);
        setSearchResults(results);
        setSearchValue("");
    }

    function handleAddToPlaylist(track) {
        console.log(JSON.stringify(track));
        if (!playlist.includes(track)) {
            setPlaylist((prev) => [track, ...prev]);
        }
        setSearchResults(searchResults.filter((element) => element != track));
    }

    function handleRemoveFromPlaylist(track) {
        console.log(JSON.stringify(track));
        setPlaylist(playlist.filter((element) => element != track));
    }
    return (
        <div className="App">
            <h1 id="title">Jamming</h1>
            <SearchBar
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
            />
            <div className={styles.app_results}>
                <SearchResults
                    searchResults={searchResults}
                    handleAddToPlaylist={handleAddToPlaylist}
                />
                <Playlist
                    playlist={playlist}
                    handleRemoveFromPlaylist={handleRemoveFromPlaylist}
                />
            </div>
        </div>
    );
}

export default App;
