const cities = require('../cities.json')
const playlistIndex = require('../index.json')
const fs = require('fs')


const locationIndex = cities.reduce((cityIndex = {}, cityEntry) => {
    const { city, state, latitude, longitude } = cityEntry;
    const key = `${city}:${state}`
    cityIndex[key] = { latitude, longitude }
    return cityIndex
})


const playlistIndexData = Object.keys(playlistIndex).map((key) =>{
    return {...playlistIndex[key], key }
})


const citiesWithLocations = {}
const citiesWithLocationIndex = playlistIndexData.reduce((citiesWithlocations, entry) => {
    const locationKey = `${entry.city}:${entry.state}`
    const location = locationIndex[locationKey]
    if (!location) {
        throw new Error(`could not find ${locationKey}`)
    }
    citiesWithLocations[entry.key] = {
        ...entry,
        ...location,
    }
    return citiesWithLocations 
})


fs.writeFile("./index-with-location.json", JSON.stringify(citiesWithLocationIndex), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 