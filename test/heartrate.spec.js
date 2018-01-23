const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;


describe('#Heart Rate', () => {

    beforeEach(() => {
        const getActivitiesResponse = require('./fixtures/heart_rate.json');

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/today/1d.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/2017-01-01/2017-03-01.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/today.json')
            .reply(200, getActivitiesResponse);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should return a heart rate data', (done) => {
        api.getTimeSeries('heart', 'today', '1d').then(json => {
            expect(json['activities-heart']).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });
});
