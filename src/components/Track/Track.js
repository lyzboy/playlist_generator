import React from "react";

import styles from "./Track.module.css";

export default function Track({
    trackName,
    artistName,
    albumName,
    handleClick,
    add,
}) {
    return (
        <div className={styles.track}>
            <div className={styles.trackInfo}>
                <h2 className={styles.trackInfo_name}>{trackName}</h2>
                <div className={styles.trackInfo_lower}>
                    <p className={`${styles.trackInfo_details}`}>
                        {artistName}
                    </p>
                    <p
                        className={`${styles.trackInfo_details} ${styles.trackInfo_spacer}`}
                    >
                        |
                    </p>
                    <p className={`${styles.trackInfo_details}`}>{albumName}</p>
                </div>
            </div>
            <button
                onClick={() => {
                    handleClick();
                }}
                className={styles.track_add}
            >
                {add === true ? "+" : "-"}
            </button>
        </div>
    );
}
