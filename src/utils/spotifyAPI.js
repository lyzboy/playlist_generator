import { generateCodeChallenge, generateCodeVerifier } from "./pkce";

//var redirect_uri = "https://spotimix.netlify.app/";
var redirect_uri = "http://localhost:3000/";

const Spotify = {
    // async getToken() {
    //     // Retrieve the token and expiration time from sessionStorage
    //     let token = sessionStorage.getItem("token");
    //     let expireTime = Number(sessionStorage.getItem("expireTime"));

    //     // Check if the token is not set or if it has expired
    //     if (!token || expireTime < new Date().getTime()) {
    //         var client_id = process.env.REACT_APP_CLIENT_ID;

    //         var scope = "playlist-modify-public";

    //         var url = "https://accounts.spotify.com/authorize";
    //         url += "?response_type=token";
    //         url += "&client_id=" + client_id;
    //         url += "&scope=" + encodeURIComponent(scope);
    //         url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

    //         // If so, redirect to the authorization URL
    //         window.location = url;

    //         // Extract the token and expiration time from the URL
    //         token = window.location.href.match(/access_token=([^&]*)/)[1];
    //         const expiresIn =
    //             window.location.href.match(/expires_in=([^&]*)/)[1];

    //         // Calculate the expiration time and store it in sessionStorage
    //         expireTime = new Date().getTime() + Number(expiresIn) * 1000;
    //         sessionStorage.setItem("expireTime", expireTime.toString());

    //         // Store the token in sessionStorage
    //         sessionStorage.setItem("token", token);
    //     }
    //     // Return the token
    //     return token;
    // },

    async getToken(){
        const token = localStorage.getItem("access_token");
        if(!token){
            const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
            const accessToken = await this.getAccessToken(code);
            return accessToken;
        } else {
            return localStorage.getItem("access_token");
        }
    },

    async verifyAuthentication() {
        try {
            if(!localStorage.getItem("access_token")){
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                if (!code) {
                    this.redirectToAuthCodeFlow();
                } else {
                    const accessToken = await this.getAccessToken(code);
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    checkExpireTime(expireTime) {
        return expireTime < new Date().getTime();
    },

    async redirectToAuthCodeFlow() {
        try {
            console.log("redirect to auth");
            const refreshToken = localStorage.getItem("refresh_token");
            const expireTime = localStorage.getItem("expireTime");
            if (refreshToken || this.checkExpireTime(expireTime)) {
                console.log("getting refresh token");
                await this.getRefreshToken();
            } else {
                console.log("get auth code");
                const verifier = generateCodeVerifier(128);
                const challenge = await generateCodeChallenge(verifier);

                localStorage.setItem("verifier", verifier);

                const params = new URLSearchParams();
                params.append("client_id", process.env.REACT_APP_CLIENT_ID);
                params.append("response_type", "code");
                params.append("redirect_uri", redirect_uri);
                params.append(
                    "scope",
                    "user-read-private user-read-email playlist-modify-public"
                );
                params.append("code_challenge_method", "S256");
                params.append("code_challenge", challenge);

                document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
            }
        } catch (error) {
            console.log(`Auth flow failure: ${error}`);
        }
    },

    async getRefreshToken() {
        try {
            // refresh token that has been previously stored
            const refreshToken = localStorage.getItem("refresh_token");
            const url = "https://accounts.spotify.com/api/token";

            const payload = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                    client_id: process.env.REACT_APP_CLIENT_ID,
                }),
            };
            const body = await fetch(url, payload);
            const response = await body.json();

            localStorage.setItem("access_token", response.accessToken);
            if (response.refreshToken) {
                localStorage.setItem("refresh_token", response.refreshToken);
            }
        } catch (error) {
            console.log(`Unable to get refresh token: ${error}`);
        }
    },

    async getAccessToken(code) {
        try {
            // get verifier from local storage
            const verifier = localStorage.getItem("verifier");

            // create params needed for access token request
            const params = new URLSearchParams();
            params.append("client_id", process.env.REACT_APP_CLIENT_ID);
            params.append("grant_type", "authorization_code");
            params.append("code", code);
            params.append("redirect_uri", redirect_uri);
            params.append("code_verifier", verifier);

            // make the POST request for the access token to the correct endpoint
            const result = await fetch(
                "https://accounts.spotify.com/api/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: params,
                }
            );
            if(result.ok){
                const { access_token, refresh_token, expires_in } =
                    await result.json();
                if (refresh_token)
                    localStorage.setItem("refresh_token", refresh_token);

                // Calculate the expiration time and store it in localStorage
                const expireTime = new Date().getTime() + Number(expires_in) * 1000;
                localStorage.setItem("expireTime", expireTime.toString());

                return access_token;
            } else {
                console.log(`There was an issue: ${result.status}`);
                this.redirectToAuthCodeFlow();
            }
        } catch (error) {
            console.log(`Unable to get access token: ${error}`);
        }
    },
};

export default Spotify;
