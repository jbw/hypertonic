const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Devices', () => {

    beforeEach(() => {
        const devices = require('./fixtures/devices.json');
        const alarms = require('./fixtures/alarms.json');

        nock(fitbitDomain).get('/1/user/-/devices.json').reply(200, devices);
        nock(fitbitDomain).get('/1/user/-/devices/tracker/383821363/alarms.json').reply(200, alarms);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get device list', (done) => {
        api.getDevices().then(json => {
            expect(json).to.not.be.undefined;
            expect(json).to.be.an('array');
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get alarms', (done) => {
        api.getAlarms('383821363').then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

});
