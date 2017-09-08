const cityIndexData = require('../index-with-location.json')
export class CityService {

  constructor() {
    const cityData = Object.keys(cityIndexData).map((entryKey) => {
      const entry = cityIndexData[entryKey]
      return {
        city: entry.city,
        state: entry.state,
        playlist_id: entry.playlist_id,
        country: 'US',
        id: entryKey,
        latitude: entry.latitude,
        longitude: entry.longitude,
      }
    })
    console.log(`loaded ${cityData.length} city entries`)
    this.cityData = cityData
  }


  getCities() {
    return this.cityData
  }
}
