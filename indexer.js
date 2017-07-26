import WorkQueue from './workQueue';


const GET_BAND_NAMES_FROM_CITY = 'GET_BAND_NAMES_FROM_CITY'
const GET_ARTIST_IDS_FROM_BAND_NAMES = 'GET_ARTIST_IDS_FROM_BAND_NAMES'

// do the fill here

const jobs = [
  {
    type: GET_BAND_NAMES_FROM_CITY,
    payload:
      {
        cityName: 'Austin',
        state: 'TX',
        country: 'US',
      }
  },
  {
    type: GET_ARTIST_IDS_FROM_BAND_NAMES,
    payload:
      {
        artistNamesPath: 'somefile.json',
      }
  }
]


const scrapeBandNames = (payload) => {
}



const workQueue = new WorkQueue(jobs)

while (!workQueue.isEmpty()) {
  // dequeue and do work MFer
  let job = workQueue.dequeue()

  switch(job.type) {
    case GET_BAND_NAMES_FROM_CITY:
      console.log('band names', job.payload)
      break;
    case GET_ARTIST_IDS_FROM_BAND_NAMES:
      console.log('artist ids', job.payload)
      break;
    default:
      console.log('not handled')
  }
}
