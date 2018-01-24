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
    });

    after(() => {
        nock.cleanAll();
    });

    it('should return a summary of activities', (done) => {

        const summary = api.getSummary('today');

        summary.then((json) => {
            expect(json.activities).to.not.equal(undefined);
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });
});



