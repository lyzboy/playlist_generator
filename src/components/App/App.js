import React, { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import styles from "./App.module.css";

import Spotify from "../../utils/spotifyAPI";

const results = [
    {
        id: 1,
        name: "Name 1",
        artist: "Artist 1",
        album: "Album 1",
    },
    {
        id: 2,
        name: "Name 2",
        artist: "Artist 2",
        album: "Album 2",
    },
    {
        id: 3,
        name: "Name 3",
        artist: "Artist 3",
        album: "Album 3",
    },
];

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");

    function handleSearch() {
        console.log(searchValue);
        Spotify.search();
        setSearchResults(results);
        setSearchValue("");
    }

    function handleAddToPlaylist(track) {
        console.log(JSON.stringify(track));
        if (!playlist.includes(track)) {
            setPlaylist((prev) => [track, ...prev]);
        }
    }

    function handleRemoveFromPlaylist(track) {
        console.log(JSON.stringify(track));
        setPlaylist(playlist.filter((element) => element !== track));
    }

    return (
        <div className="App">
            <h1 id="title">Jammmin</h1>
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
                    playlistName={playlistName}
                    setPlaylistName={setPlaylistName}
                />
            </div>
        </div>
    );
}

export default App;
