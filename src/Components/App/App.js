import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [
        // {
        //   name: 'Honey',
        //   artist: "Kehlani",
        //   album: 'SSS',
        //   id: '1'
        // }
      ],

      playListName: '',

      playListTracks: [
        // {
        //   name: 'Honey',
        //   artist: 'Kehlani',
        //   album: 'SSS',
        //   id: '2'
        // }
      ]

    };
  }

  // removeTrack(track) {
  //   if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
  //     return;
  //   } else {
  //     this.state.playListTracks.pop();
  //   }
  //   let newPlayListTracks = this.state.playlistTracks;
  //   this.setState({playlistTracks: newPlayListTracks});
  // }

  removeTrack (track) {
    let newPlayListTracks = this.state.playListTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playListTracks: newPlayListTracks});
  }

  addTrack(track) {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.state.playListTracks.push(track);
    }
    let newPlayListTracks = this.state.playListTracks;
    this.setState({playListTracks: newPlayListTracks});
  };

  updatePlayListName(name) {
    this.setState({playListName: name});
  }

  savePlayList(){
    let trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  };

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults: results });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
            // onTermChange={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
