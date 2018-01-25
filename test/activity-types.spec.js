const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Types', () => {
    beforeEach(() => {
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity types list', (done) => {
        done(new Error());
    });

    it('should get activity type detail', (done) => {
        done(new Error());
    });

    it('should get frequent activity types', (done) => {
        done(new Error());
    });

    it('should get recent activity types', (done) => {
        done(new Error());
    });

    it('should get favourite activity types', (done) => {
        done(new Error());
    });
});
