const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Devices', () => {
    after(() => {
        nock.cleanAll();
    });

    it('should get device list', (done) => {
        done(new Error());
    });

    it('should get alarms', (done) => {
        done(new Error());
    });

});
