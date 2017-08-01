const request = require('request');
const credentials = require('./.credentials.json');
const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');

const SpotifyWebApi = require('spotify-web-api-node');


require('./utils.js');

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId : credentials.client_id,
  clientSecret : credentials.client_secret,
  redirectUri: 'localhost:8888/callback',
});




function authorize() {
  // Retrieve an access token.
  return spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    });
}

function userAuth() {

// The code that's returned as a query parameter to the redirect URI
var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';

// Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant(code)
  .then(function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

}



function searchArtists(artistName) {
  return spotifyApi.searchArtists(artistName)
    .then(data => {
      return data.body
    })
}


function mapArtistNameToArtistID(artistNames) {
  return Promise.map(artistNames, name => {
    return searchArtists(name);
  }, {concurrency: 4})
    .then ((result) => {
      const ids = result.map( (responseBody) => {
        if (responseBody.artists.items.length > 0) {
          return responseBody.artists.items[0].id
        }
        return ''
      })
      const artistNameAndIds = _.zip(artistNames, ids)
      const foundArtists = artistNameAndIds.filter((artistNameAndId) => {
        return artistNameAndId[1] !== '';
      })
      return foundArtists
    })
}

function getTopSongs(artistId) {
  return spotifyApi.getArtistTopTracks(artistId, 'US')
    .then( response => {
      const trackIds = response.body.tracks.slice(0,3).map((track) => {
        return track.id
      })
      return trackIds;
    })
}

function mapArtistIdsToTopTracks(artistIDs) {
  return Promise.map(artistIDs, artistID => {
    return getTopSongs(artistID)
  }, {concurrency: 2})
}


function useAuth() {
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);
}


function addTracksToPlaylist(batchOfTrackIds, playlistId, userId) {
  const spotifyUris = batchOfTrackIds.map((trackId) => {
    return `spotify:track:${trackId}`
  })
  return spotifyApi.addTracksToPlaylist(userId, playlistId, spotifyUris)
}

function processArtistNames(filepath, outputFilePath) {
  const artistNames = require(filepath)
  mapArtistNameToArtistID(artistNames.artistNames)
    .then((artistNamesAndIds) => {
      const artistData = artistNamesAndIds.map((artistNameAndId) => {
        return { name: artistNameAndId[0], artistId: artistNameAndId[1] }
      })
      const result = {
        city: artistNames.city,
        state: artistNames.state,
        artists: artistData,
      }
      fs.writeFile(outputFilePath, JSON.stringify(result), (err) => {
        if (err) {
          console.log(err);
        }
        console.log('file written');
      })
    })
}

function processArtistIds(artistIdFile, outputFilePath) {
  const artistIds = artistIdFile.artists.map((artistData) => {
    return artistData.artistId
  })
  const artistNames = artistIdFile.artists.map((artistData) => {
    return artistData.name
  })
  mapArtistIdsToTopTracks(artistIds)
    .then((topTracksIds) => {
      const artistDataZipped = _.zip(artistIds, artistNames, topTracksIds)
      const artistData = artistDataZipped.map((artistData) => {
        return {
          artistId: artistData[0],
          name: artistData[1],
          topTracks: artistData[2],
        }
      })
      const result = {
        city: artistIdFile.city,
        state: artistIdFile.state,
        artists: artistData,
      }
      fs.writeFile(outputFilePath, JSON.stringify(result), (err) => {
        if (err) {
          console.log(err);
        }
        console.log('file written');
      })
    })
}

// useAuth()


function createPlaylistAndAddTracks(filePath) {
  const cityData = require(filePath)

  const topTracks = _.flatten(cityData.artists.map((artistData) => {
    return artistData.topTracks
  }))
  const trackBatches = _.chunk(topTracks, 100)

  spotifyApi.createPlaylist(userId, `Songs from ${cityData.city}, ${cityData.state} USA`)
    .then((data) => {
      const playlistId = data.body.id
      Promise.map(trackBatches, tracks => {
        return addTracksToPlaylist(tracks, playlistId, userId)
      }, {concurrency: 4 })
        .then(() => {
          console.log('tracks added successfully')
          cityData.playlistId = playlistId
          cityData.playlistName = playlistName
          fs.writeFile
        })
        .catch((err) => {
          console.log('err')
        })
    }, (err) => {
      console.log('something went wrong', err);
    })
}

function cityStateToFilepath(city, state) :w{}

