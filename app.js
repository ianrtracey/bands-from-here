const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')

const indexData = require('./index.json')

const indexIds = Object.keys(indexData)
const entries = indexIds.map((id) => {
  const entry = indexData[id]
  return {
    state: entry.state,
    city: entry.city,
    playlistId: entry.playlist_id,
  }
})

app.get('/data', function (req, res) {
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000

const router = express.Router();

router.get('/cities', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(entries)
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
