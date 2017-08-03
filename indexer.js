import WorkQueue from './workQueue';
const citiesData = require('./cities.json');
const exec = require('exec');


const GET_BAND_NAMES_FROM_CITY = 'GET_BAND_NAMES_FROM_CITY'
const GET_ARTIST_IDS_FROM_BAND_NAMES = 'GET_ARTIST_IDS_FROM_BAND_NAMES'

// All jobs must have an action type and a payload
const scrapingJobs = citiesData.map((entry) => {
  return {
    type: GET_BAND_NAMES_FROM_CITY,
    payload: {
    city: entry.city,
    state: entry.state,
    }
  }
});

const workQueue = new WorkQueue(scrapingJobs)

while (!workQueue.isEmpty()) {
  // dequeue and do work MFer
  let job = workQueue.dequeue()

  switch(job.type) {
    case GET_BAND_NAMES_FROM_CITY:
      exec(`python scrape.py ${job.payload.city} ${job.payload.state} ./artists`,
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        });
      break;
    case GET_ARTIST_IDS_FROM_BAND_NAMES:
      console.log('artist ids', job.payload)
      break;
    default:
      console.log('not handled')
  }
}
