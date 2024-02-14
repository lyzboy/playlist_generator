var client_id = "7bd3a135912c46449b2387c6a65ec687";
var redirect_uri = "http://localhost:3000/";

var scope = "user-read-private user-read-email";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

let token;
let expireTime;

const Spotify = {
    getToken() {
        if (expireTime < new Date().getTime() || !token) {
            window.location = url;
            token = window.location.href.match(/access_token=([^&]*)/)[1];
            const timeToExpire =
                window.location.href.match(/expires_in=([^&]*)/)[1];
            console.log(`The token is: ${token}`);
            console.log(`The time to expire is: ${timeToExpire}`);
            expireTime = new Date().getTime() + Number(timeToExpire) * 1000;
            return token;
        } else {
            return token;
        }
    },

    search(term) {
        const userToken = this.getToken();
    },
};

export default Spotify;
