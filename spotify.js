const request = require('request');
const credentials = require('./.credentials.json');
const Promise = require('bluebird');
const fs = require('fs');
const _ = require('underscore');

const SpotifyWebApi = require('spotify-web-api-node');

const artistData = require('./artist_data.json');
const sfArtistIDs = require('./san_francisco_ids.json');
const sfTrackIDs = require('./san_francisco_track_ids.json');

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


function getArtistIdsByCity() {
  const artistNames = artistData['San Francisco'].artists;

  authorize()
    .then( () => {
      return Promise.map(artistNames, name => {
        return searchArtists(name);
      }, {concurrency: 4});
    })
    .then ((result) => {
      const ids = result.map( (responseBody) => {
        if (responseBody.artists.items.length > 0) {
          return responseBody.artists.items[0].id;
        }
        return '';
      })
      const foundIds = ids.filter((id) => {
        return id !== '';
      })
      const idData = {
        city: 'San Francisco',
        artistIDs: foundIds,
      }

      const idJson = JSON.stringify(idData);
      fs.writeFile('./san_francisco_ids.json', idJson, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('file written');
      })
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
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);
}


function addTracksToPlaylist() {

}
useAuth();
console.log(sfTrackIDs);
const trackUris = sfTrackIDs.map((trackID) =>
   `spotify:track:${trackID}`
)
console.dir(trackUris);
// max of 100 items can be added at a time
spotifyApi.addTracksToPlaylist(userId, playlistID, trackUris.slice(0, 99))
  .then((result) => {
    console.log(result)
  }, (err) => {
    console.log(err)
})

// spotifyApi.createPlaylist(userId, 'Bands from San Francisco')
//   .then((data) => {
//      console.log(data);
//   }, (err) => {
//      console.log('something went wrong', err);
//   })
// getTopSongs();









// function getCreds() {
//   const client_id = credentials.client_id;
//   const client_secret = credentials.client_secret;
//   const creds = `${client_id}:${client_secret}`
//   const base64EncodedCreds = new Buffer(creds).toString('base64');
//   return base64EncodedCreds;
// }
//
// function fetch(options) {
//   return new Promise( (resolve, reject) => {
//     request(options, (error, res, body) => {
//       if (!error && res.statusCode == 200) {
//         resolve(body);
//       } else {
//         reject(body);
//       }
//     });
//   });
// }
//
// function post(options) {
// }
//
//
// function authorize(creds) {
//   const options = {
//     url: 'https://accounts.spotify.com/api/token',
//     body: JSON.stringify({
//       grant_type: 'client_credentials',
//     }),
//     headers: {
//       'Authorization': `Basic ${creds}`,
//     },
//   }
//   console.log(options);
//   request.post(options, (error, response, body) => {
//     if (!error) {
//       console.log(body);
//     }
//     console.log(`error: ${error}`);
//   })
// }
//
// function searchArtist(artistName)  {
//   const options = {
//     url: `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer BQDAiq6ZC7P3GyJRQ-NNqRQLXlGy5cFJyHzGrxJR5wW--Z5PJ-u1DmdDo0Y9qbSTyD4Ledow7DORq9CRe56TuLsEcZmreOMKtWU7eMfuaaZ3tzZ1CfK-VRMFQ26CClYqvSvTomBiB9WinQ"
//     }
//   }
//   return get(options);
// }
//
// async function getStuff() {
// const res = await searchArtist("Radiohead");
// return JSON.parse(res);
// }
//
// async function main() {
//   const response = await getStuff();
//   console.log(response.artists.items[0]);
// }
//
// const authCreds = getCreds();
// authorize(authCreds);
//
//
// // const artistNames = artistData['San Francisco'].artists;
// // console.dir(artistNames);
// // const sample = artistNames[0];
// // searchArtist(sample);
//
