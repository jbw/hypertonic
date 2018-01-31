const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Goals', () => {
    beforeEach(() => {
        const activityGoals = require('./fixtures/activity-goals.json');
        nock(fitbitDomain).get('/1/user/-/activities/goals/1d.json').reply(200, activityGoals);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity goals', (done) => {
         api.getActivityGoals('1d').then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });
});
