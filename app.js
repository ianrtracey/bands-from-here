const express    = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app        = express()

import { routes } from './routes'
import { authRoutes } from './routes/auth'

const port = process.env.PORT || 8080

app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('frontend/dist'))
   .use(cookieParser());



app.use('/', routes);
app.use('/auth', authRoutes);

app.listen(port, '127.0.0.1', () => {
  console.log('Magic happens on port ' + port);
})

