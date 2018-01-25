const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Types', () => {
    beforeEach(() => {
        const bodyAndWeight = require('./fixtures/body-and-weight.json');

        nock(fitbitDomain)
            .get('/1/activities.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/activities/9001.json')
            .reply(200, bodyAndWeight);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity types list', (done) => {

    });

    it('should get activity type detail', (done) => {

    });

    it('should get frequent activity types', (done) => {

    });

    it('should get recent activity types', (done) => {

    });

    it('should get favourite activity types', (done) => {

    });
});
