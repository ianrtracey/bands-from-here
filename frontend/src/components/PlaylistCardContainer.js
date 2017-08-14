import React from 'react';
import { connect } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import PlaylistCard from './PlaylistCard';

class PlaylistCardContainerImpl extends React.Component {
  render() {
    console.log('props', this.props)
    return (
      <ReactCardFlip isFlipped={this.props.isFlipped}>
        <PlaylistCard key="front"
          selectedCity={this.props.frontCardTitle}
          playlistId={this.props.frontCardButtonPlaylistId}
        />
        <PlaylistCard key="back"
          selectedCity={this.props.backCardTitle}
          playlistId={this.props.backCardButtinPlaylistId}
        />
      </ReactCardFlip>
    )
  }
}

export default PlaylistCardContainer

const mapStateToProps = (state) => {
  // then front is showing (or going to show)
  if (state.playlistCard.isFlipped == true) {
    return {
      frontCardTitle: state.playlistCard.lastPlaylist.label,
      frontCardButtonPlaylistId: state.playlistCard.lastPlaylist.value,
      backCardTitle: state.playlistCard.currentPlaylist.label,
      backCardButtinPlaylistId: state.playlistCard.currentPlaylist.value,
      isFlipped: state.playlistCard.isFlipped,
    }
  }
  return {
    frontCardTitle: state.playlistCard.currentPlaylist.label,
    frontCardButtonPlaylistId: state.playlistCard.currentPlaylist.value,
    backCardTitle: state.playlistCard.lastPlaylist.label,
    backCardButtinPlaylistId: state.playlistCard.lastPlaylist.value,
    isFlipped: state.playlistCard.isFlipped,
  }
}

export const PlaylistCardContainer = connect(mapStateToProps)(PlaylistCardContainerImpl)
