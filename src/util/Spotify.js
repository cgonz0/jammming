let accessToken;
const redirectURI = 'http://localhost:3000/';
const clientID = '***REMOVED***';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let URLToken = window.location.href.match(/access_token=([^&]*)/);
    let URLExp = window.location.href.match(/expires_in=([^&]*)/);

    if (URLToken && URLExp) {
      accessToken = URLToken[1];
      //return Number not string
      expiresIn = Number(URLExp[1]);
      //wipe access tokens and URL params
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
    }
  }
}


export default Spotify;