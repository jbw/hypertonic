
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const nock = require('nock');
const moment = require('moment');

const Hypertonic = require('../src/api');
const api = Hypertonic('NO_TOKEN');

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
        describe('#Activity', () => {

            describe('# Summary', () => {
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

                it('should return a valid summary resource.', (done) => {
                    const summary = api
                        .getActivities()
                        .from('today')
                        .getURL();

                    expect(summary).to.equal('https://api.fitbit.com/1/user/-/activities/date/today.json');
                    done();
                });

                it('should return a summary of activities', (done) => {

                    api.getActivities()
                        .from('today')
                        .fetch()
                        .then((json) => {
                            expect(json.activities).to.not.equal(undefined);
                            done();
                        })
                        .catch(err => {
                            done(err);
                        });
                });

                it('should return summary stats for today', (done) => {
                    api.getActivities().fetch().then(json => {
                        expect(json.summary).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
                    });
                });

                it('should return summary stats for the last 7 days', (done) => {
                    api.getWeeklySummary().then(json => {
                        expect(json.summary).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
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

                });

                after(() => {
                    nock.cleanAll();
                });

                it('should return a valid steps resource.', (done) => {

                    const urlRange = api
                        .getActivities('steps')
                        .from('2017-07-28')
                        .to('2017-07-30')
                        .getURL();

                    const url1Month = api
                        .getActivities('steps')
                        .from('2017-08-05')
                        .to('1m')
                        .getURL();

                    const url1MonthSpec = 'https://api.fitbit.com/1/user/-/activities/steps/date/2017-08-05/1m.json';
                    const urlRangeSpec = 'https://api.fitbit.com/1/user/-/activities/steps/date/2017-07-28/2017-07-30.json';

                    expect(url1Month).to.equal(url1MonthSpec);
                    expect(urlRange).to.equal(urlRangeSpec);
                    done();
                });

                it('should return steps today', (done) => {
                    api.getActivities('steps')
                        .from()
                        .to('1d')
                        .fetch()
                        .then(json => {
                            expect(json['activities-steps'][0].value).to.be.a('string');
                            done();
                        }).catch(err => {
                            done(err);
                        });
                });
            });

            describe('#Distance', () => {
                beforeEach(() => {
                    const getDistanceResponse = require('./fixtures/activities_distance_1d.json');
                    nock(fitbitDomain)
                        .get(`/1/user/-/activities/distance/date/${todaysDate}/1d.json`)
                        .reply(200, getDistanceResponse);
                });

                after(() => {
                    nock.cleanAll();
                });

                it('should return distance today', (done) => {
                    api.getActivities('distance')
                        .from()
                        .to('1d')
                        .fetch()
                        .then(json => {
                            expect(json['activities-distance'][0].value).to.be.an('string');
                            done();
                        }).catch(err => {
                            done(err);
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
                    api.getActivities('calories').fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
                    });
                });

                it('should return calories for the past 7 days', (done) => {

                    api.getActivities('calories').from('today').to('7d').fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
                    });
                });
                it('should return calories for the past 7 days', (done) => {

                    api.getActivities('calories').from().to('7d').fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
                    });
                });

                it('should return calories for the past 7 days', (done) => {

                    api.getActivities('calories').from().to().fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
                    });
                });

                it('should return calories for the past 7 days', (done) => {

                    api.getActivities('calories').to('7d').fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
                        done(err);
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
            api.getFriends('leaderboard').fetch().then(json => {
                expect(json.friends).to.be.a('array');
                done();
            }).catch(err => {
                done(err);
            });

        });
    });

    describe('#Heart Rate', () => {

        beforeEach(() => {
            const getActivitiesResponse = require('./fixtures/activities_today.json');

            nock(fitbitDomain)
                .get('/1/user/-/activities/heart/date/today/1d.json')
                .reply(200, getActivitiesResponse);

            nock(fitbitDomain)
                .get('/1/user/-/activities/heart/date/today.json')
                .reply(200, getActivitiesResponse);

        });

        after(() => {
            nock.cleanAll();
        });

        it('should return a heart rate data', (done) => {
            api.getActivities('heart').from('today').fetch().then(json => {
                expect(json['activities-heart']).to.not.be.undefined;
                done();
            });


        });

    });

    describe('#Sleep', () => {

        beforeEach(() => {
            const getActivitiesResponse = require('./fixtures/activities_today.json');

            nock(fitbitDomain)
                .get(`/1.2/user/-/sleep/date/${todaysDate}.json`)
                .reply(200, getActivitiesResponse);

            nock(fitbitDomain)
                .get('/1.2/user/-/sleep/date/today.json')
                .reply(200, getActivitiesResponse);

        });

        after(() => {
            nock.cleanAll();
        });

        it('should return a sleep data', (done) => {
            api.getSleepLogs().from('today').fetch().then(json => {
                expect(json.sleep).to.not.be.undefined;
                done();
            });
        });

        it('should return a sleep data', (done) => {
            api.getSleepLogs().fetch().then(json => {
                expect(json.sleep).to.not.be.undefined;
                done();
            });
        });
    });

    describe('#Subscriptions', () => {

    });

    describe('#User', () => {

    });
});
