const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Logging', () => {
    beforeEach(() => {

        // https://api.fitbit.com/1/user/-/activities/list.json

        // https://api.fitbit.com/1/user/[user-id]/activities/[log-id].tcx

        const logList = require('./fixtures/activity-log-list.json');

        nock(fitbitDomain)
            .get('/1/user/-/activities/list.json')
            .reply(200, logList);

        nock(fitbitDomain)
            .get('/1/user/-/activities/1.tcx')
            .reply(200, {});

    });

    after(() => {
        nock.cleanAll();
    });

    it.only('should get activity logs list', (done) => {
        api.getActivityLogsList().then(json => {
            expect(json.activities).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });

    it.only('should get activity TCX', (done) => {
        api.getActivityTCX('9810280066').then(xml => {
            expect(xml).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });
});

