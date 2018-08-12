import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css'

class PlayList extends React.Component {

  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          defaultValue={'New PlayList'}
        />
        <TrackList
          tracks={this.props.playListTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;