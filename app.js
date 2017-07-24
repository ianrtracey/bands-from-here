const express = require('express')
const app = express()

app.get('/auth', function (req, res) {
  console.log(req);
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
