const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Sleep', () => {

    beforeEach(() => {
        const sleepData = require('./fixtures/sleep.json');
        const sleepGoal = require('./fixtures/sleep-goal.json');
        const sleepLogList = require('./fixtures/sleep-log-list.json');
        const sleepNoScope = require('./fixtures/sleep_no_scope.json');

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/2017-01-01.json')
            .reply(200, sleepData);

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/2017-01-01/2017-01-05.json')
            .reply(200, sleepData);

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/today.json')
            .reply(200, sleepData);

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/date/2017-12-12.json')
            .reply(300, sleepNoScope);

        nock(fitbitDomain)
            .get('/1.2/user/-/sleep/list.json?beforeDate=2017-03-27&sort=desc&offset=0&limit=1')
            .reply(200, sleepLogList);

        nock(fitbitDomain)
            .get('/1/user/-/sleep/goal.json')
            .reply(200, sleepGoal);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should return a sleep goal', (done) => {
        api.getSleepGoal().then(json => {
            expect(json.goal).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
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

    it('should return a sleep log list', (done) => {
        api.getSleepLogsList('2017-03-27', undefined, 'desc', 0, 1).then(json => {
            expect(json.sleep).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return a sleep data give a date range', (done) => {
        api.getSleepLogs('2017-01-01', '2017-01-05').then(json => {
            expect(json.sleep).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should handle missing scope error', (done) => {
        api.getSleepLogs('2017-12-12').then(json => {
            done();
        }).catch(err => {
            expect(err.errors).to.not.be.undefined;
            expect(err.errors[0].errorType).to.equal('insufficient_scope');
            done();
        });
    });
});
