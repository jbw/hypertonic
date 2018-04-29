const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;


describe('#Heart Rate', () => {

    beforeEach(() => {
        const getActivitiesResponse = require('./fixtures/heart_rate.json');
        const intraday = require('./fixtures/intraday.json');

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/today/1d.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/2017-01-01/2017-03-01.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/today.json')
            .reply(200, getActivitiesResponse);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/2017-01-01/1sec.json')
            .reply(200, intraday);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/2017-01-01/1sec/time/00:00/00:01.json')
            .reply(200, intraday);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/1d/1sec.json')
            .reply(200, intraday);

        nock(fitbitDomain)
            .get('/1/user/-/activities/heart/date/1d/1sec/time/00:00/00:01.json')
            .reply(200, intraday);

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


    it('should return intraday heart rate data (date and detail)', (done) => {
        api.getTimeSeries('heart', 'today', '1d', '1sec').then(json => {
            expect(json['activities-heart']).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return intraday heart rate data (date, detail and time)', (done) => {
        api.getTimeSeries('heart', '2017-03-01', '1d', '1sec', '00:00', '00:01').then(json => {
            expect(json['activities-heart']).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });


    it('should return intraday heart rate data (detail)', (done) => {
        api.getTimeSeries('heart', 'today', '1d', '1sec').then(json => {
            expect(json['activities-heart']).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return intraday heart rate data (1d, 1min)', (done) => {
        api.getTimeSeries('heart', '2017-03-01', '1d', '1sec').then(json => {
            expect(json['activities-heart']).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should return intraday heart rate data (detail and time)', (done) => {
        api.getTimeSeries('heart', 'today', '1d', '1sec', '00:00', '00:01').then(json => {
            expect(json['activities-heart']).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

});
