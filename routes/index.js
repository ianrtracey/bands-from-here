const routes = require('express').Router();
import { CityService } from '../services/CityService'
// import { LocationService } from '../services/LocationService'

const cityService = new CityService()
// const locationService = new LocationService()


routes.get('/healthcheck', (req, res) => {
  console.log(req.ip)
  res
    .status(200)
    .json({ status: 'UP' })
})


routes.get('/', (req, res) => {
  res
    .sendFile('/static/index.html')
})


// routes.post('/api/location', (req, res) => {
//   const { latitude, longitude } = req.body
//   const result = locationService.getNearest({latitude, longitude})
//   res.json({ result })
// })


routes.get('/api/data', (req, res) => {
  const response = cityService.getCities()
  res
    .status(200)
    .json({ results: response })
})

export { routes }

