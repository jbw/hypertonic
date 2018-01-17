
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

let secretsPath = process.env.REMOTE_BUILD ? '../secrets_template/' : '../secrets/';
const token = require(secretsPath + 'token.json').token.access_token;

const Hypertonic = require('../src/api');

const api = Hypertonic(token);

describe('API', () => {

    describe('#Connection', () => {
        it('should return invalid client with no credentials', () => {
            return api.getActivities().fetch().then((json, error) => {

                if (process.env.REMOTE_BUILD) return;

                if (error) {
                    assert.fail(error.message);
                }
                expect(json.summary).to.be.not.equal(undefined);

            });
        });

    });

    describe('#Activities', () => {
        describe('#Time Series', () => {
            describe('#Activity Summary', () => {
                it('should return a valid summary resource.', () => {
                    const summary = api
                        .getActivities()
                        .from('today')
                        .getURL();

                    expect(summary).to.equal('https://api.fitbit.com/1/user/-/activities/date/today.json');

                });

                it('should return activities summary data from server', () => {
                    if (process.env.REMOTE_BUILD) return;
                    return api
                        .getActivities()
                        .from('today')
                        .fetch()
                        .then((json) => {
                            expect(json.activities).to.not.equal(undefined);
                        })
                        .catch(err => {
                            assert.fail(err.message);
                        });
                });
            });

            describe('#Steps', () => {

                it('should return a valid steps resource.', () => {

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
                });

                it('should return steps today', () => {
                    if (process.env.REMOTE_BUILD) return;
                    return api
                        .getActivities('steps')
                        .from()
                        .to('1d')
                        .fetch()
                        .then(json => {
                            expect(json['activities-steps'][0].value).to.be.an('string');
                        }).catch(err => {
                            assert.fail(err.message);
                        });
                });

                it('should return distance today', () => {
                    if (process.env.REMOTE_BUILD) return;
                    return api
                        .getActivities('distance')
                        .from()
                        .to('1d')
                        .fetch()
                        .then(json => {
                            expect(json['activities-distance'][0].value).to.be.an('string');
                        }).catch(err => {
                            assert.fail(err.message);
                        });
                });

                it('should return calories for today', () => {
                    if (process.env.REMOTE_BUILD) return;

                    return api.getActivities('calories').fetch().then(json => {
                        expect(json['activities-calories'][0].value).to.be.not.equal(undefined);
                    });

                });

                it('should return summary stats for today', () => {
                    if (process.env.REMOTE_BUILD) return;
                    return api.getActivities().fetch().then(json => {
                        expect(json.summary).to.be.not.equal(undefined);
                    });

                });

                it('should return summary stats for the last 7 days', () => {
                    if (process.env.REMOTE_BUILD) return;
                    return api.getWeeklySummary().then(json => {
                        expect(json.summary).to.be.not.equal(undefined);
                    }).catch(err => {
                        assert.fail(err.message);
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
        it('should return leaderboard', () => {
            if (process.env.REMOTE_BUILD) return;
            return api.getFriends('leaderboard').then(json => {
                expect(json.summary).to.be.not.equal(undefined);
            }).catch(err => {
                assert.fail(err.message);
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
