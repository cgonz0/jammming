import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css'

class PlayList extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New PlayList'}/>
        <TrackList tracks={this.props.playListTracks}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;