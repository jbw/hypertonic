const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Summary', () => {
    beforeEach(() => {
        const getActivitiesResponse = require('./fixtures/activities_today.json');

        nock(fitbitDomain)
            .get('/1/user/-/activities/date/today.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/date/2017-01-01.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/date/7d.json')
            .reply(200, getActivitiesResponse);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should return a summary of activities without date', (done) => {

        const summary = api.getSummary();

        summary.then((json) => {
            expect(json.activities).to.not.equal(undefined);
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return a summary of activities with date name', (done) => {

        const summary = api.getSummary('today');

        summary.then((json) => {
            expect(json.activities).to.not.equal(undefined);
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return a summary of activities with date', (done) => {

        const summary = api.getSummary('2017-01-01');

        summary.then((json) => {
            expect(json.activities).to.not.equal(undefined);
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });
});



