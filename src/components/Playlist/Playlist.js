import React from 'react';

import styles from './Playlist.module.css';

import Track from '../Track/Track';

export default function Playlist({playlist, handleRemoveFromPlaylist}){
    return(
        <div className={styles.playlist}>
            <h2>Playlist</h2>
            {playlist ? playlist.map((track)=>{
                return <Track trackName={track.name} artistName={track.artist} albumName={track.album} handleClick={()=>handleRemoveFromPlaylist(track)} add={false}/>
            }) : <p>Loading...</p>}
            <button className={styles.playlistButton}>Save to Spotify</button>
        </div>
    );
};