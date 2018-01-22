
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const nock = require('nock');
const moment = require('moment');

const Hypertonic = require('../src/api');
const token = process.env.NOCK_OFF ? require('../secrets/token.json').token.access_token : 'NO_TOKEN';

const api = Hypertonic(token);

const fitbitDomain = 'https://api.fitbit.com';

describe('API', () => {
    const todaysDate = moment(new Date()).format('YYYY-MM-DD');

    describe('#Connection', () => {
        it('should return error response if initialised with no token', (done) => {
            expect(function () { Hypertonic(); }).to.throw(Error);
            done();
        });
    });

    describe('#Activities', () => {

        describe('#Summary', () => {
            beforeEach(() => {
                const getActivitiesResponse = require('./fixtures/activities_today.json');

                nock(fitbitDomain)
                    .get('/1/user/-/activities/date/today.json')
                    .reply(200, getActivitiesResponse);

                nock(fitbitDomain)
                    .get(`/1/user/-/activities/date/${todaysDate}.json`)
                    .reply(200, getActivitiesResponse);
            });

            after(() => {
                nock.cleanAll();
            });

            it('should return a summary of activities', (done) => {

                const summary = api.getSummary('today');

                summary.then((json) => {
                    expect(json.activities).to.not.equal(undefined);
                    done();
                }).catch(err => {
                    console.log(err);
                    done(new Error());
                });
            });


        });

        describe('#Time series', () => {

            beforeEach(() => {
                const getActivitiesResponse = require('./fixtures/activities_today.json');

                nock(fitbitDomain)
                    .get('/1/user/-/activities/calories/date/2017-05-01/2017-05-05.json')
                    .reply(200, getActivitiesResponse);
                nock(fitbitDomain)
                    .get('/1/user/-/activities/calories/date/today/1d')
                    .reply(200, getActivitiesResponse);
                nock(fitbitDomain)
                    .get('/1/user/-/activities/calories/date/today/2018-01-01.json')
                    .reply(200, getActivitiesResponse);

            });

            after(() => {
                nock.cleanAll();
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

        describe('#Steps', () => {
            beforeEach(() => {
                const getStepsResponse = require('./fixtures/activities_steps_1d.json');

                nock(fitbitDomain)
                    .get(`/1/user/-/activities/steps/date/${todaysDate}/1d.json`)
                    .reply(200, getStepsResponse);

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

            it('should return steps today', (done) => {

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
                    .get('/1/user/-/activities/calories/date/today.json')
                    .reply(200, getCaloriesResponse);

                nock(fitbitDomain)
                    .get(`/1/user/-/activities/calories/date/${todaysDate}/today.json`)
                    .reply(200, getCaloriesResponse);

                nock(fitbitDomain)
                    .get(`/1/user/-/activities/calories/date/${todaysDate}/1d.json`)
                    .reply(200, getCaloriesResponse);

                nock(fitbitDomain)
                    .get(`/1/user/-/activities/calories/date/${todaysDate}/7d.json`)
                    .reply(200, getCaloriesResponse);

                nock(fitbitDomain)
                    .get(`/1/user/-/activities/calories/date/${todaysDate}/${todaysDate}.json`)
                    .reply(200, getCaloriesResponse);

                nock(fitbitDomain)
                    .get('/1/user/-/activities/calories/date/today/7d.json')
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

            it('should return calories for the past 7 days', (done) => {

                api.getTimeSeries('calories', 'today', '7d').then(json => {
                    expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                    done();
                }).catch(err => {
                    console.log(err);
                    done(new Error());
                });
            });

        });

        describe('#Activity Types', () => {

        });

        describe('#Activity Logging', () => {

        });

        describe('#Activity Goals', () => {

        });

        describe('#Lifetime Stats', () => {

        });


    });

    describe('#Body and Weight', () => {

    });

    describe('#Devices', () => {

    });

    describe('#Food Logging', () => {

    });

    describe('#Friends', () => {
        beforeEach(() => {
            const getFriendsLeaderboard = require('./fixtures/friends_leaderboard.json');
            nock(fitbitDomain)
                .get('/1/user/-/friends/leaderboard.json')
                .reply(200, getFriendsLeaderboard);
        });

        after(() => {
            nock.cleanAll();
        });

        it('should return leaderboard', (done) => {
            api.getFriends('leaderboard').then(json => {
                expect(json.friends).to.be.a('array');
                done();
            }).catch(err => {
                console.log(err);
                done(new Error());
            });

        });
    });

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

            nock(fitbitDomain)
                .get(`/1/user/-/activities/heart/date/${todaysDate}/${todaysDate}.json`)
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

    describe('#Subscriptions', () => {

    });

    describe('#User', () => {

    });

});
