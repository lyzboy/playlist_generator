import React, { useEffect, useState } from "react";

import styles from "./Notifier.module.css";

export default function Notifier({ hidden }) {
    const [isAbsolute, setIsAbsolute] = useState(true);
    useEffect(() => {
        if (!hidden) {
            setIsAbsolute(false);
        } else {
            setTimeout(() => {
                setIsAbsolute(true);
            }, 200);
        }
    }, [hidden]);
    return (
        <div
            className={`${styles.notifier} ${hidden ? styles.hidden : ""} ${
                isAbsolute ? styles.absolute_position : ""
            }`}
        >
            <p>You have not changed your playlist name.</p>
            <p>
                Are you show that you would like to save with the default name?
            </p>
        </div>
    );
}
