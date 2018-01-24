const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const noScopeApi = test.noScopeApi;
const fitbitDomain = test.fitbitDomain;


describe('#Sleep', () => {

    beforeEach(() => {
        const getActivitiesResponse = require('./fixtures/sleep.json');

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/2017-01-01.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/today.json')
            .reply(200, getActivitiesResponse);

        const sleepNoScope = require('./fixtures/sleep_no_scope.json');

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/2017-12-12.json')
            .reply(300, sleepNoScope);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should return a sleep data', (done) => {
        api.getSleepLogs().then(json => {
            expect(json.sleep).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return a sleep data', (done) => {
        api.getSleepLogs('2017-01-01').then(json => {
            expect(json.sleep).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });


    it('should handle missing scope error', (done) => {
        api.getSleepLogs('2017-12-12').then(json => {
            done(new Error());
        }).catch(err => {
            expect(err.errors).to.not.be.undefined;
            expect(err.errors[0].errorType).to.equal('insufficient_scope');
            done();
        });
    });
});
