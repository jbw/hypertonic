const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Logging', () => {
    beforeEach(() => {

        const logList = require('./fixtures/activity-log-list.json');

        nock(fitbitDomain)
            .get('/1/user/-/activities/9810280066.tcx')
            .replyWithFile(200, __dirname + '/fixtures/gnr.tcx', { 'Content-Type': 'application/vnd.garmin.tcx+xml' });

        nock(fitbitDomain)
            .get('/1/user/-/activities/list.json')
            .reply(200, logList);


    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity logs list', (done) => {
        api.getActivityLogsList().then(json => {
            expect(json.activities).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));

    });

    it('should get activity TCX', (done) => {
        api.getActivityTCX('9810280066').then(xml => {
            expect(xml).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });
});

