import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Honey',
          artist: "Kehlani",
          album: 'SSS',
          id: '1'
        }
      ],

      playListName: 'Jams',

      playListTracks: [
        {
          name: '',
          artist: '',
          album: '',
          id: ''
        }
      ]

    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <PlayList playListName={this.state.playlistName} playListTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
