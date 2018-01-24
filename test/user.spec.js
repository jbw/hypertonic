const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#User', () => {

    after(() => {
        nock.cleanAll();
    });

    it('should get profile', (done) => {
    });

    it('should get badges', (done) => {

    });

});
