
var assert = require('assert');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

let appConfig = {};
let authCreds = {};

if (process.env.REMOTE_BUILD) {

    appConfig = {
        auth: {
            token: {
                access_token: '',
                refresh_token: ''
            }
        },
        app: {
            scopes: '',
            callbackHost: '',
            callbackPath: ''
        }
    };

    authCreds = {
        client: {
            id: '0',
            secret: '0'
        },
        auth: {
            tokenHost: 'https://api.fitbit.com',
            tokenPath: '/oauth2/token',
            authorizeHost: 'https://www.fitbit.com',
            authorizePath: '/oauth2/authorize'
        }
    };


} else {

    const token = require('../.secret/token.json');

    const authConfig = {
        callbackHost: 'http://localhost:3000',
        callbackPath: '/auth/fitbit/callback'
    };

    appConfig = {

        auth: token,

        app: {
            scopes: 'activity profile settings',
            callbackHost: authConfig.callbackHost,
            callbackPath: authConfig.callbackPath
        }
    };

    authCreds = require('../.secret/fitbit.json');
}

const Hypertonic = require('../src/api');
const api = Hypertonic(appConfig.auth);

describe('API', () => {

    describe('#Connection', () => {
        it('should return invalid client with no credentials', () => {
            return api.getActivities().fetch().then(json => {
                if (process.env.REMOTE_BUILD) {
                    expect(json.errors.length).to.equal(1);
                    expect(json.errors[0].errorType).to.equal('invalid_client');
                } else {
                    expect(json.summary).to.be.not.equal(undefined);
                }
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
                        .then(json => {
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
