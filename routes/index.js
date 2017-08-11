const routes = require('express').Router();
import { CityService } from '../services/CityService'

const cityService = new CityService()



routes.get('/healthcheck', (req, res) => {
  res
    .status(200)
    .json({ status: 'UP' })
})

routes.get('/api/data', (req, res) => {
  const response = cityService.getCities()
  res
    .status(200)
    .json({ results: response })
})

export { routes }

