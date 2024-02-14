var client_id = '7bd3a135912c46449b2387c6a65ec687';
var redirect_uri = 'http://localhost:3000/';

var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);



const Spotify = {
    getToken(){
        window.location = url;
    },

    search(term){
        const returnUrl = this.getToken();
        console.log(returnUrl);
    }
}

export default Spotify;