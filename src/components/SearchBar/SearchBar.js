import React from "react";

export default function SearchBar() {
    return (
        <form>
            <input data-testid="song-input" placeholder="Enter song tile" />
            <button data-testid="song-search">Search</button>
        </form>
    );
}
