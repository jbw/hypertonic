const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;
const fs = require('fs');

describe('#Activity Types', () => {
    beforeEach(() => {

        const types = require('./fixtures/activity-types.json');
        const detail = require('./fixtures/activity-detail.json');
        const frequentRecent = require('./fixtures/activities-frequent-recent.json');
        const favorite = require('./fixtures/activities-favorite.json');

        nock(fitbitDomain)
            .get('/1/activities.json')
            .reply(200, types);

        nock(fitbitDomain)
            .get('/1/activities/3040.json')
            .reply(200, detail);

        nock(fitbitDomain)
            .get('/1/user/-/activities/frequent.json')
            .reply(200, frequentRecent);

        nock(fitbitDomain)
            .get('/1/user/-/activities/recent.json')
            .reply(200, frequentRecent);

        nock(fitbitDomain)
            .get('/1/user/-/activities/favorite.json')
            .reply(200, favorite);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity types list', (done) => {
        api.getActivityTypes().then(json => {
            expect(json.categories).to.not.be.undefined;
            expect(json.categories).to.be.an('array');
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get activity type detail', (done) => {
        api.getActivityType('3040').then(json => {
            expect(json.activity.id).equals(3040);
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get frequent activity types', (done) => {
        api.getFrequentActivities().then(json => {
            expect(json).to.be.an('array');
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get recent activity types', (done) => {
        api.getRecentActivities().then(json => {
            expect(json).to.be.an('array');
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });

    it('should get favourite activity types', (done) => {
        api.getFavoriteActivities().then(json => {
            expect(json).to.be.an('array');
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });


});
