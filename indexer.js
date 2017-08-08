const fs = require('fs');
const spotify = require('./spotify')
const Promise = require('bluebird')

const CITY_DATA_DIR = './artists'
const OUTPUT_DATA_DIR = './data'


const files = fs.readdirSync(CITY_DATA_DIR).map((file) => {
  return `${CITY_DATA_DIR}/${file}`
})
const indexFiles = fs.readdirSync(OUTPUT_DATA_DIR).map((file) => {
  return `${OUTPUT_DATA_DIR}/${file}`
})

const alreadyIndexed = (cityData) => {
  const canonicalFilename = spotify.canonicalCityFilename(cityData.city, cityData.state)
  return (indexFiles.indexOf(`./data/${canonicalFilename}.json`)) != -1
}

Promise.each(files, file => {
  const cityData = require(file)
  console.log(file)
  if (alreadyIndexed(cityData)) {
    return Promise.resolve()
  }
  return spotify.createPlaylistFromCityData(cityData)
})
  .then((res) => {
    console.log('done with all cities!')
  })
