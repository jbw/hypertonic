const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Time series', () => {

    describe('#Steps', () => {
        beforeEach(() => {
            const getStepsResponse = require('./fixtures/activities_steps_1d.json');

            nock(fitbitDomain)
                .get('/1/user/-/activities/steps/date/today.json')
                .reply(200, getStepsResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/steps/date/today/1d.json')
                .reply(200, getStepsResponse);

        });

        after(() => {
            nock.cleanAll();
        });

        it('should return steps for today', (done) => {

            api.getTimeSeries('steps', 'today')
                .then(json => {
                    expect(json['activities-steps'][0].value).to.be.a('string');
                    done();
                }).catch(err => {
                    console.log(err);
                    done(new Error());

                });
        });

        it('should return steps today', (done) => {

            api.getTimeSeries('steps', 'today', '1d')
                .then(json => {
                    expect(json['activities-steps'][0].value).to.be.a('string');
                    done();
                }).catch(err => {
                    console.log(err);
                    done(new Error());
                });
        });
    });

    describe('#Distance', () => {
        beforeEach(() => {
            const getDistanceResponse = require('./fixtures/activities_distance_1d.json');
            nock(fitbitDomain)
                .get('/1/user/-/activities/distance/date/today/1d.json')
                .reply(200, getDistanceResponse);
        });

        after(() => {
            nock.cleanAll();
        });

        it('should return distance today', (done) => {
            api.getTimeSeries('distance', 'today', '1d')
                .then(json => {
                    expect(json['activities-distance'][0].value).to.be.an('string');
                    done();
                }).catch(err => {
                    console.log(err);
                    done(new Error());
                });
        });
    });

    describe('#Calories', () => {

        beforeEach(() => {
            const getCaloriesResponse = require('./fixtures/activities_calories.json');

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/2017-05-01/2017-05-05.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/today/1d.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/today/2018-01-01.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/today.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/bad.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/today/7d.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/bad/date/today/7d.json')
                .reply(200, getCaloriesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/calories/date/today/bad.json')
                .reply(200, getCaloriesResponse);

        });

        after(() => {
            nock.cleanAll();
        });

        it('should return calories for today', (done) => {

            api.getTimeSeries('calories', 'today').then(json => {
                expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                done();
            }).catch(err => {
                console.log(err);
                done(new Error());
            });
        });

        it('should return validation errors', (done) => {

            Promise.all([
                api.getTimeSeries('calories', 'today', 'bad').then(json => {
                    return Promise.reject(false);
                }).catch(err => {
                    return Promise.resolve();
                }),

                api.getTimeSeries('bad', 'today', '7d').then(json => {
                    return Promise.reject(false);
                }).catch(err => {
                    return Promise.resolve();
                }),

                api.getTimeSeries('calories', 'bad').then(json => {
                    return Promise.reject(false);
                }).catch(err => {
                    return Promise.resolve();
                })

            ]).then(results => {
                results.includes(false) ? done(new Error()) : done();
            });
        });

        it('should return calories for the past 7 days', (done) => {
            api.getTimeSeries('calories', 'today', '7d').then(json => {
                expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                done();
            }).catch(err => {
                done(new Error());
            });
        });

        it('should return time series stats for calories', (done) => {
            api.getTimeSeries('calories', '2017-05-01', '2017-05-05').then(json => {
                expect(json).to.be.not.equal(undefined);
                done();
            }).catch(err => {
                console.log(err);
                done(new Error());
            });
        });

    });
});
