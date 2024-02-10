import React from "react";

export default function SearchBar() {
    return (
        <div>
            <form>
                <input
                    type="text"
                    name="song-input"
                    placeholder="Enter song title"
                />
                <button>Search</button>
            </form>
        </div>
    );
}
