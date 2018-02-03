const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Goals', () => {
    beforeEach(() => {
        const activityGoals = require('./fixtures/activity-goals.json');
        nock(fitbitDomain).get('/1/user/-/activities/goals/daily.json').reply(200, activityGoals);
        nock(fitbitDomain).get('/1/user/-/activities/goals/weekly.json').reply(200, activityGoals);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity goals', (done) => {
        api.getActivityGoals('daily').then(json => {
            expect(json.goals).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });


    it('should get activity goals', (done) => {
        api.getActivityGoals('weekly').then(json => {
            expect(json.goals).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });

    it('should error with invalid period parameter', (done) => {
        api.getActivityGoals('1d').then(json => {
            done(new Error('invalid parameter'));
        }).catch(err => {
            expect(err).to.not.be.undefined;
            done();
        });

    });
});
