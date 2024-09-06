import React, { useState } from "react";

import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";
import Notifier from "../Notifier/Notifier";

export default function Playlist({
    playlist,
    handleRemoveFromPlaylist,
    playlistName,
    setPlaylistName,
    handleSavePlaylist,
}) {
    const [hidden, setHidden] = useState(true);
    const validatePlaylistName = async () => {
        try {
            if (playlistName === "New Playlist") {
                setHidden(false);
                await setTimeout(() => {
                    setHidden(true);
                }, 5000);
            } else {
                setHidden(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                onClick={() => {
                    if (playlist.length > 0) {
                        setHidden(true);
                        handleSavePlaylist();
                    }
                }}
                className={styles.playlistButton}
                onMouseEnter={() => {
                    validatePlaylistName();
                }}
            >
                Save to Spotify
            </button>
            <Notifier hidden={hidden} />
        </div>
    );
}
