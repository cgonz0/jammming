let accessToken;
let expiresIn;
// const redirectURI = 'http://jammmies.surge.sh';
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
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
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
      if (jsonResponse.tracks) {
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

  savePlayList(playListName, trackURIs) {

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    if (!playListName && !trackURIs.length) {
      return;
    }
    // Make a request to retrieve user ID
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
   // Convert the response to json
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    // Set the userID to the returned Id
    }).then(jsonResponse => {
      let userID = jsonResponse.id;

      // Use returned userID to create the playlist on Spotify
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: playListName})
        // convert the response to json
      }).then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError);
      // Set playListID to the returned playList ID
      }).then(jsonResponse => {
        let playListID = jsonResponse.id;
        const uriData = JSON.stringify({uris: trackURIs});

        // Add tracks to the playlist
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: uriData
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
        })
      })
    })


  }

}


export default Spotify;