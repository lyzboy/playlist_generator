import React from "react";

import styles from "./PlayButton.module.css";

export default function PlayButton() {
    return (
        <div className={styles.playButton}>
            {true ? (
                <span className="material-symbols-outlined">play_circle</span>
            ) : (
                <span className="material-symbols-outlined">pause_circle</span>
            )}
        </div>
    );
}
