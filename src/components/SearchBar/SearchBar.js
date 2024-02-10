import React from "react";

export default function SearchBar({ setSearchValue, handleSearch }) {
    function handleSubmit(e) {
        e.preventDefault();
        handleSearch();
    }
    return (
        <div>
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
