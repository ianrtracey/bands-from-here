const request = require('request');
const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const credentials = require('./.spotify-credentials.json')
const SpotifyWebApi = require('spotify-web-api-node');

import "isomorphic-fetch"



let exports = module.exports = {}


// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId : credentials.client_id,
  clientSecret : credentials.client_secret,
  redirectUri: 'localhost:8888/callback',
});

exports.canonicalCityFilename = function canonicalCityFilename(city, state) {
  return `${city} ${state}`.toLowerCase().replace(' ', '_')
}


function getArtistId(artistName) {
  return spotifyApi.searchArtists(artistName)
    .then(response => {
      const data = response.body.artists.items
      if (data.length > 0) {
        return { name: artistName, artistId: data[0].id }
      }
      return { name: artistName, artistId: '' }
    }, err => {
      console.log('err', err)
      throw err
    })
}


function mapArtistNamesToIds(artistNames) {
    return Promise.map(artistNames, name => {
        return getArtistId(name)
    }, {concurrency: 3})
}

function mapArtistIdsToTopTracks(artistData) {
  return Promise.map(artistData, artist => {
    return getTopSongs(artist)
  }, {concurrency: 3})
}

function getTopSongs(artistData) {
  return spotifyApi.getArtistTopTracks(artistData.artistId, 'US')
    .then( response => {
      const trackIds = response.body.tracks.slice(0,3).map((track) => {
        return track.id
      })
      // ultimatly want to use ... syntax for this
      return { artistName: artistData.artistName,
               artistId: artistData.artistId,
               topTrackIds: trackIds,
             }
    })
}

function mapArtistSongsToTopTracks() {
  const artistIDs = sfArtistIDs.artistIDs;
  return Promise.map(artistIDs, artistID => {
    return getTopSongs(artistID)
  }, {concurrency: 2}
  )
  .then ((result) => {
      const trackIds = _.flatten(result);
      const trackData = {
        city: 'San Francisco',
        trackIds: trackIds,
      }
      fs.writeFile('./san_francisco_track_ids.json', JSON.stringify(trackIds), (err) => {
        if (err) {
          console.log(err);
        }
        console.log('file written');
      })
    })
}

function useAuth() {
  spotifyApi.setAccessToken(credentials.accessToken);
  spotifyApi.setRefreshToken(credentials.refreshToken);
}


function addTracksToPlaylist(userId, trackIds, playlistId) {
  const trackUris = trackIds.map((trackId) => {
    return `spotify:track:${trackId}`
  })
  const trackChunks = _.chunk(trackUris, 99)
  return Promise.map(trackChunks, tracks => {
    return spotifyApi.addTracksToPlaylist(userId, playlistId, tracks)
  }, {concurrency: 3})
}

function base64EncodePhoto(file) {
  const bitmap = fs.readFileSync(file)
  return new Buffer(bitmap).toString('base64')
}

function uploadPhotoToPlaylist(userId, playlistId, filepath) {
  useAuth()
  const imageEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/images`
  console.log(credentials.accessToken)
  fetch(imageEndpoint,
    {
    method: 'PUT',
    body: base64EncodePhoto(filepath),
    headers: new Headers({
        'Authorization': `Bearer ${credentials.accessToken}`,
        'Content-Type': 'image/jpeg',
    })
    }
  )
    .then(resp => {
      console.log(resp.status)
      console.log(resp.text().then((text) => {
        console.log(text)
      }))
      })
}

async function getPlaylist(userId, playlistId) {
  useAuth()
  const resp =  await spotifyApi.getPlaylist(userId, playlistId)
  return resp.body

}

exports.createPlaylistFromCityData = function createPlaylistFromCityData(cityData) {
useAuth();
return mapArtistNamesToIds(cityData.artistNames)
  .then( (artistNameAndIDs) => {
    console.log('done getting artist ids')
    const validArtistIds = artistNameAndIDs.filter((artistEntry) => {
      return artistEntry.artistId != ''
    })
    return mapArtistIdsToTopTracks(validArtistIds)
  })
  .then( (artistTopTracks) => {
    const data = cityData
    return spotifyApi.createPlaylist(credentials.userId, `Bands from ${data.city}, ${data.state}`)
      .then((data) => {
        return { artistData: artistTopTracks, playListId: data.body.id }
      }, (err) => {
         console.log('something went wrong', err);
      })
  })
  .then((result) => {
    console.log('created playlist', result.playListId)
    const indexEntry = {
      city: cityData.city,
      state: cityData.state,
      artists: cityData.artistNames,
      playlistId: result.playListId,
    }
    const filename = exports.canonicalCityFilename(cityData.city, cityData.state)
    fs.writeFile(`./data/${filename}.json`, JSON.stringify(indexEntry), (err) => {
      if (err) {
        console.log('index file was not saved', indexEntry)
      }
      console.log(`index file for ${filename} was written`)
    })
    const trackIds = _.flatten(result.artistData.map((entry) => {
      return entry.topTrackIds
    }))
    return addTracksToPlaylist(credentials.userId, trackIds, result.playListId)
  })
  .then((result) => {
    console.log('done!')
  })
}

// uploadPhotoToPlaylist('bandsfromhere', '5rM4q6dOvjm9R2AHbvim7o', './austin.jpg')
getPlaylist('bandsfromhere', '5rM4q6dOvjm9R2AHbvim7o')
  .then((resp) => {
    console.log(resp.images)
  })
