import React, { useState, useEffect, createContext, useRef } from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import styles from "./App.module.css";

import Spotify from "../../utils/spotifyAPI";

const PlayPreviewContext = createContext(null);
const PlayingTrackContext = createContext(null);

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [currentTrackPlaying, setCurrentTrackPlaying] = useState(null);
    const audio = useRef(null);

    useEffect(() => {
        if (currentTrackPlaying === null) {
            audio.current = null;
        } else {
            audio.current = new Audio(currentTrackPlaying);
            audio.current.play();
        }
    }, [currentTrackPlaying]);

    useEffect(() => {
        Spotify.getToken();
    }, []);

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
        setPlaylist(playlist.filter((element) => element !== track));
    }

    const handleSavePlaylist = async () => {
        try {
            if (playlist.length > 0) {
                await Spotify.handleCreateNewPlaylist(playlist, playlistName);
                setPlaylist([]);
            }
        } catch (error) {
            console.error(`Error handling save playlist: ${error}`);
        }
    };

    const handlePlayPreview = (trackPreview) => {
        // If a track is currently playing
        if (audio.current) {
            // Stop the current track
            audio.current.pause();
            audio.current = null;
            setCurrentTrackPlaying(null);
        }

        // If the new track is not the same as the current track
        if (trackPreview !== currentTrackPlaying) {
            // Start playing the new track
            setCurrentTrackPlaying(trackPreview);
        }
    };

    return (
        <PlayPreviewContext.Provider value={handlePlayPreview}>
            <PlayingTrackContext.Provider value={currentTrackPlaying}>
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
            </PlayingTrackContext.Provider>
        </PlayPreviewContext.Provider>
    );
}

export { PlayPreviewContext, PlayingTrackContext };
export default App;
