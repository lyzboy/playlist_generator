import React from "react";

import styles from "./SearchBar.module.css";

export default function SearchBar({ setSearchValue, handleSearch }) {
    function handleSubmit(e) {
        e.preventDefault();
        handleSearch();
    }
    return (

            <form onSubmit={handleSubmit} className={styles.searchBar}>
                <input className={styles.searchInput}
                    type="text"
                    name="song-input"
                    placeholder="Enter song title"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className={styles.searchButton}>Search</button>
            </form>
    );
}
