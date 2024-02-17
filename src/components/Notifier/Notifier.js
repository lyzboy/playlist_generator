import React from 'react';

import styles from './Notifier.module.css';

export default function Notifier({hidden}){
    return(
        <div className={`${styles.notifier} ${hidden ? styles.hidden :  ''}`}>
            <p>You have not changed your playlist name.</p>
            <p>Are you show that you would like to save with the default name?</p>
        </div>
    );
}