
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const nock = require('nock');


const Hypertonic = require('../src/api');
const api = Hypertonic('NO_TOKEN');

const fitbitDomain = 'https://api.fitbit.com';

describe('API', () => {

    describe('#Connection', () => {
        it('should return invalid client with no credentials', (done) => {
            api.getActivities().fetch().then((json) => {
                expect(json.summary).to.be.not.equal(undefined);
                done();
            }).catch(err => {
                done(err);
            });
        });

    });

    describe('#Activities', () => {
        describe('#Time Series', () => {
            describe('#Activity Summary', () => {
                beforeEach(() => {
                    const getActivitiesResponse = {
                        activities: []
                    };

                    nock(fitbitDomain).get('/1/user/-/activities/date/today.json').reply(200, getActivitiesResponse);

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

                it('should return activities summary data from server', (done) => {

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
            });

            describe('#Steps', () => {

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

                it('should return calories for today', (done) => {
                    api.getActivities('calories').fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                        done();
                    }).catch(err => {
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

            describe('#Activity Types', () => {

            });

            describe('#Activity Logging', () => {

            });

            describe('#Activity Goals', () => {

            });

            describe('#get Lifetime Stats', () => {

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
        it('should return leaderboard', (done) => {
            return api.getFriends('leaderboard').fetch().then(json => {
                expect(json.friends).to.be.a('array');
            }).catch(err => {
                done(err);
            });

        });
    });

    describe('#Heart Rate', () => {

    });

    describe('#Sleep', () => {

    });

    describe('#Subscriptions', () => {

    });

    describe('#User', () => {

    });
});
