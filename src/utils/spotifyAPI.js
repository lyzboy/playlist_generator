var client_id = process.env.REACT_APP_CLIENT_ID;

var redirect_uri = "http://localhost:3000/";

var scope = "user-read-private user-read-email";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + client_id;
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

const Spotify = {
    getToken() {
        // Retrieve the token and expiration time from localStorage
        let token = localStorage.getItem("token");
        let expireTime = Number(localStorage.getItem("expireTime"));

        // Check if the token is not set or if it has expired
        if (!token || expireTime < new Date().getTime()) {
            // If so, redirect to the authorization URL
            window.location = url;

            // Extract the token and expiration time from the URL
            token = window.location.href.match(/access_token=([^&]*)/)[1];
            const expiresIn =
                window.location.href.match(/expires_in=([^&]*)/)[1];

            // Calculate the expiration time and store it in localStorage
            expireTime = new Date().getTime() + Number(expiresIn) * 1000;
            localStorage.setItem("expireTime", expireTime.toString());

            // Store the token in localStorage
            localStorage.setItem("token", token);
        }
        // Return the token
        return token;
    },

    async search(term) {
        try {
            const userToken = await this.getToken();
            const baseUrl = "https://api.spotify.com/v1/search?";
            const searchUrl = `${baseUrl}q=${encodeURIComponent(term)}&type=track`;
            // Continue with search implementation
            const response = await fetch(searchUrl, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const data = await response.json();
            const items = data.tracks.items;
            console.log(items);
            const finalArray = [];
            for(let item of items){
                let track = {};
                track.name = item.name;
                track.id = item.id;
                track.album=item.album.name;
                track.artist=item.artists[0].name;
                finalArray.push(track);
            }
            return finalArray;
        } catch (error) {
            console.log(`There was an error when searching: ${error}`);
            return [];
        }
    },
};

export default Spotify;
