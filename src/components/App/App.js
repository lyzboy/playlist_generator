import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import styles from "./App.module.css";

import Spotify from "../../utils/spotifyAPI";

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");

    const handleSearch = async () => {
        try {
            const results = await Spotify.search(searchValue);
            setSearchResults(results);
            setSearchValue("");
        } catch (error) {
            console.log(`There was an error in App.js handleSearch: ${error}`);
        }
    };

    function handleAddToPlaylist(track) {
        if (!playlist.includes(track)) {
            setPlaylist((prev) => [track, ...prev]);
        }
    }

    function handleRemoveFromPlaylist(track) {
        console.log(JSON.stringify(track));
        setPlaylist(playlist.filter((element) => element !== track));
    }

    const handleSavePlaylist = async () => {
        try {
            await Spotify.handleCreateNewPlaylist(playlist, playlistName);
            setPlaylist([]);
        } catch (error) {
            console.error(`Error handling save playlist: ${error}`);
        }
    };

    return (
        <div className="App">
            <h1 id="title">Jammmin</h1>
            <SearchBar
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
                searchValue={searchValue}
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
                    handleSavePlaylist={handleSavePlaylist}
                />
            </div>
        </div>
    );
}

export default App;
