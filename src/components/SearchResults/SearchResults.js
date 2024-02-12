import React from 'react';
import Track from '../Track/Track';

import styles from './SearchResults.module.css';

export default function SearchResults({searchResults, handleAddToPlaylist}){
    return(
        <div className={styles.searchResults}>
            <h2 className={styles.searchResults_header}>Search Results:</h2>
            {searchResults ? searchResults.map((track)=>{
                return <Track trackName={track.name} artistName={track.artist} albumName={track.album} handleClick={()=>handleAddToPlaylist(track)} add={true}/>
            }) : <p>Loading...</p>}
        </div>
    );
}