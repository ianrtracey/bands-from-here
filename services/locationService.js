const geolib = require('geolib')

export class LocationService {
    constructor(cityDataPath = '../cities.json') {
        this.locationData = this._buildIndex(cityDataPath) 
    }

    _buildIndex(path) {
        const cityData = require(path)
        return cityData
    }

    getNearest(coordinates) {
        const nearestIndex = geolib.findNearest(coordinates, this.locationData, 0)
        const cityData = this.locationData[nearestIndex.key]
        const { city, state, latitude, longitude } = cityData
        return { city, state, latitude, longitude }

    }
}