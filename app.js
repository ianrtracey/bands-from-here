const express    = require('express')
const app        = express()
import { routes } from './routes'

// const indexIds = Object.keys(indexData)
// const entries = indexIds.map((id) => {
//   const entry = indexData[id]
//   return {
//     state: entry.state,
//     city: entry.city,
//     playlistId: entry.playlist_id,
//   }
// })

const port = process.env.PORT || 8080

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use('/', routes);

app.listen(port, () => {
  console.log('Magic happens on port ' + port);
})

