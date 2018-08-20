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
      searchResults: [],

      playListName: '',

      playListTracks: []
    };
  }

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


  savePlayList() {
    let trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      });
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults: results });
    });
  }

  // getUserID(userID) {
  //   Spotify.getUserID(userID).then(id => {
  //     this.setState({ userID: id });
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <div className="userID">Welcome{this.getUserID.name}</div> */}
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
