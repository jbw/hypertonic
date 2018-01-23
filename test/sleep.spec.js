const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
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



});
