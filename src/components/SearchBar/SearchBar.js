import React from "react";

import styles from "./SearchBar.module.css";

export default function SearchBar({ setSearchValue, handleSearch }) {
    function handleSubmit(e) {
        e.preventDefault();
        handleSearch();
    }
    return (
        <div className={styles.searchBar}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="song-input"
                    placeholder="Enter song title"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button>Search</button>
            </form>
        </div>
    );
}
