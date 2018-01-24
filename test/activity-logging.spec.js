const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Logging', () => {
    beforeEach(() => {
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity logs list', (done) => {

    });

    it('should get activity TCX', (done) => {

    });
});

