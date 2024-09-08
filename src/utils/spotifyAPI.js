const Spotify = {
    async getToken() {
        // Retrieve the token and expiration time from sessionStorage
        let token = sessionStorage.getItem("token");
        let expireTime = Number(sessionStorage.getItem("expireTime"));

        // Check if the token is not set or if it has expired
        if (!token || expireTime < new Date().getTime()) {
            var client_id = process.env.REACT_APP_CLIENT_ID;

            //var redirect_uri = "https://spotimix.netlify.app/";
            var redirect_uri = "http://localhost:3000/";

            var scope = "playlist-modify-public";

            var url = "https://accounts.spotify.com/authorize";
            url += "?response_type=token";
            url += "&client_id=" + client_id;
            url += "&scope=" + encodeURIComponent(scope);
            url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

            // If so, redirect to the authorization URL
            window.location = url;

            // Extract the token and expiration time from the URL
            token = window.location.href.match(/access_token=([^&]*)/)[1];
            const expiresIn =
                window.location.href.match(/expires_in=([^&]*)/)[1];

            // Calculate the expiration time and store it in sessionStorage
            expireTime = new Date().getTime() + Number(expiresIn) * 1000;
            sessionStorage.setItem("expireTime", expireTime.toString());

            // Store the token in sessionStorage
            sessionStorage.setItem("token", token);
        }
        // Return the token
        return token;
    },

    async search(term) {
        // if token is not create, search doesn't happen
        try {
            // get the token
            const userToken = await this.getToken();
            const baseUrl = "https://api.spotify.com/v1/search?";
            const endpoint = `${baseUrl}q=${encodeURIComponent(
                term
            )}&type=track`;
            // Continue with search implementation
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                // get correct data from response
                const items = data.tracks.items;
                // refactor returned objects into objects with needed data
                const finalArray = [];
                for (let item of items) {
                    let track = {};
                    track.name = item.name;
                    track.id = item.id;
                    track.album = item.album.name;
                    track.artist = item.artists[0].name;
                    track.previewUrl = item.preview_url;
                    finalArray.push(track);
                }
                return finalArray;
            }
        } catch (error) {
            console.log(`There was an error when searching: ${error}`);
            return [];
        }
    },

    async handleCreateNewPlaylist(tracks, playlistName) {
        try {
            const token = await this.getToken();
            const playlistObject = await this.generatePlaylistData(
                tracks,
                playlistName
            );
            const userId = await this.getUserId(token);
            const playlistId = await this.createNewPlaylist(
                token,
                userId,
                playlistObject.name
            );

            await this.addTracksToPlaylist(
                token,
                playlistId,
                playlistObject.trackURIs
            );
            console.log("playlist has been created.");
        } catch (error) {
            console.error(`Error handling playlist creation: ${error}`);
        }
    },

    async generatePlaylistData(tracks, playlistName) {
        const trackURIs = [];
        for (let track of tracks) {
            trackURIs.push(`spotify:track:${encodeURI(track.id)}`);
        }
        return { name: playlistName, trackURIs: trackURIs };
    },

    async createNewPlaylist(userToken, userId, playlistName) {
        const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: playlistName,
                description: "A playlist generated using the Jammmin app!",
            }),
        });
        if (response.ok) {
            const data = await response.json();
            const playlistId = data.id;
            console.log("You new playlist has been created!");
            return playlistId;
        } else {
            throw new Error(
                `Create New Playlist: Status ${response.status}: ${response.message}`
            );
        }
    },

    async getUserId(userToken) {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            const user_id = data.id;
            return user_id;
        } else {
            throw new Error(
                `Get User ID: Status ${response.status}: ${response.message}`
            );
        }
    },

    async addTracksToPlaylist(userToken, playlistId, trackURIs) {
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                uris: trackURIs,
                position: 0,
            }),
        });
        if (response.ok) {
            console.log("Tracks added to playlist");
        } else {
            throw new Error(
                `Add Tracks To Playlist: Status ${response.status}: ${response.message}`
            );
        }
    },
};

export default Spotify;
