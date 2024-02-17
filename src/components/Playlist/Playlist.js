import React from "react";

import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";

export default function Playlist({
    playlist,
    handleRemoveFromPlaylist,
    playlistName,
    setPlaylistName,
    handleSavePlaylist,
}) {
    return (
        <div className={styles.playlist}>
            <input
                className={styles.playlist_input}
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <Tracklist
                tracks={playlist}
                handlePlaylistManagement={handleRemoveFromPlaylist}
                add={false}
            />
            <button
                onClick={handleSavePlaylist}
                className={styles.playlistButton}
            >
                Save to Spotify
            </button>
        </div>
    );
}
