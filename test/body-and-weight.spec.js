const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Body Fat Logs', () => {
    beforeEach(() => {
        const bodyAndWeight = require('./fixtures/body-and-weight.json');

        nock(fitbitDomain)
            .get('/1/user/[user-id]/body/log/fat/date/[date].json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/[user-id]/body/log/fat/date/[date]/[period].json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/[user-id]/body/log/fat/date/[base-date]/[end-date].json')
            .reply(200, bodyAndWeight);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get body fat logs', (done) => {
        api.getBodyFatLogs('2018-01-01').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body fat logs', (done) => {
        api.getBodyFatLogs('2018-01-01', '7d').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body fat logs', (done) => {
        api.getBodyFatLogs('today').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {

            done(new Error(err));
        });
    });

    it('should get body fat logs', (done) => {
        api.getBodyFatLogs('today', '1m').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

});

describe('#Body Time Series', () => {
    beforeEach(() => {
        const bodyAndWeight = require('./fixtures/body-and-weight.json');

        nock(fitbitDomain)
            .get('/1/user/-/body/bmi/date/2017-05-01/1d.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/bmi/date/today/2017-01-01.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/fat/date/2017-05-01/1d.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/fat/date/today/2017-01-01.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/weight/date/today/2017-01-01.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/weight/date/2017-05-01/1d.json')
            .reply(200, bodyAndWeight);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get body fat logs', (done) => {
        api.getBodyTimeSeries('fat', '2018-01-01').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body bmi logs', (done) => {
        api.getBodyTimeSeries('bmi', '2018-01-01').then(json => {
            expect(json.bmi).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body weight logs', (done) => {
        api.getBodyTimeSeries('weight', '2018-01-01').then(json => {
            expect(json.weight).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });
});

describe('#Body Goals', () => {

    beforeEach(() => {
        const goalWeight = require('./fixtures/goal-weight.json');
        const goalFat = require('./fixtures/goal-fat.json');

        nock(fitbitDomain)
            .get('/1/user/-/body/log/weight/goal.json')
            .reply(200, goalWeight);
        nock(fitbitDomain)
            .get('/1/user/-/body/log/fat/goal.json')
            .reply(200, goalFat);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get body fat goal', (done) => {
        api.getBodyGoal('fat').then(json => {
            expect(json.goal).to.be.an('object');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body weight goal', (done) => {
        api.getBodyGoal('weight').then(json => {
            expect(json.goal).to.be.an('object');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

});
