import React from "react";

import Track from "../Track/Track";

import styles from "./Tracklist.module.css";

export default function Tracklist({ tracks, handlePlaylistManagement, add }) {
    return (
        <>
            {tracks ? (
                tracks.map((track) => {
                    return (
                        <Track
                            key={track.id}
                            trackName={track.name}
                            artistName={track.artist}
                            albumName={track.album}
                            handleClick={() => handlePlaylistManagement(track)}
                            add={add}
                        />
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
