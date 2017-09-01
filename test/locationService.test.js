const assert = require('assert');
import { expect } from 'chai';
import "babel-polyfill"

import {
    LocationService    
} from '../services/locationService'


describe('LocationService', () => {

    const MountainViewTestCoordinates = {
        latitude: 37.399606299999995,
        longitude: -122.0871878,
    }

    describe("getCity", () => {
        const locationService = new LocationService()
        it('should get nearest city given location', () => {
            const res = locationService.getNearest(MountainViewTestCoordinates)
            console.dir(res)
            expect(res).to.deep.equal({
                city: 'Mountain View',
                state: 'California',
                latitude: 37.3860517,
                longitude: -122.0838511, 
            })
        })
    })

})