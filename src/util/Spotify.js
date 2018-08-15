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
  },

  search(searchTerm) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${seachTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request Failed!');
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
      if (jsonResponse.tracks.item) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    })
  },


}


export default Spotify;