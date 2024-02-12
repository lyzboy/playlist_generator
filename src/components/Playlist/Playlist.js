import React from "react";

import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";

export default function Playlist({ playlist, handleRemoveFromPlaylist }) {
    return (
        <div className={styles.playlist}>
            <input
                className={styles.playlist_input}
                type="text"
                placeholder="Playlist"
            />
            <Tracklist
                tracks={playlist}
                handlePlaylistManagement={handleRemoveFromPlaylist}
                add={false}
            />
            <button className={styles.playlistButton}>Save to Spotify</button>
        </div>
    );
}
