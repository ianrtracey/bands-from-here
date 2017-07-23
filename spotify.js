const request = require('request');
const artistData = require('./artist_data.json');

function searchArtist(artistName)  {
  const options = {
    url: `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer BQDAiq6ZC7P3GyJRQ-NNqRQLXlGy5cFJyHzGrxJR5wW--Z5PJ-u1DmdDo0Y9qbSTyD4Ledow7DORq9CRe56TuLsEcZmreOMKtWU7eMfuaaZ3tzZ1CfK-VRMFQ26CClYqvSvTomBiB9WinQ"
    }
  }
  return new Promise( (resolve, reject) => {
    request(options, (error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(body);
      }
    });
  });
}

async function getStuff() {
const res = await searchArtist("Radiohead");
return JSON.parse(res);
}

async function main() {
  const response = await getStuff();
  console.log(response.artists.items[0]);
}

const artistNames = artistData['San Francisco'].artists;
console.dir(artistNames);
const sample = artistNames[0];
searchArtist(sample);

