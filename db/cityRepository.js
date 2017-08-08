const _ = require('lodash');

export default class CityRepository {
  CityRepository(indexData) {
    console.dir(indexData)
    indexIds = Object.keys(indexData)
    entries = indexIds.map((id) => {
      entry = indexData[id]
      return {
        state: entry.state,
        city: entry.city,
        playlistId: entry.playlistId,
      }
    })
    this.items = entries;
  }

  search(query) {
    return {}
  }

  getAll() {
    return this.items
  }
}
