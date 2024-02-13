import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import styles from "./SearchResults.module.css";

export default function SearchResults({ searchResults, handleAddToPlaylist }) {
    return (
        <div className={styles.searchResults}>
            <h2 className={styles.searchResults_header}>Search Results:</h2>
            <Tracklist
                tracks={searchResults}
                handlePlaylistManagement={handleAddToPlaylist}
                add={true}
            />
        </div>
    );
}
