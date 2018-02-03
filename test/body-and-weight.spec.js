const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Body Fat Logs', () => {
    beforeEach(() => {
        const bodyAndWeight = require('./fixtures/body-log.json');

        nock(fitbitDomain)
            .get('/1/user/-/body/log/fat/date/2017-01-01.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/log/weight/date/2017-01-01.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/log/weight/date/2017-01-01/7d.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/log/fat/date/2017-01-01/7d.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/log/fat/date/today/7d.json')
            .reply(200, bodyAndWeight);

        nock(fitbitDomain)
            .get('/1/user/-/body/log/fat/date/2017-12-01.json')
            .reply(200, bodyAndWeight);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get body fat logs', (done) => {
        api.getBodyFatLogs('2017-01-01').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            console.log(err);
            done(new Error(err));
        });
    });

    it('should get body fat logs', (done) => {
        api.getBodyFatLogs('2017-01-01', '7d').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(JSON.stringify(err)));
        });
    });


    it('should get body weight logs', (done) => {
        api.getBodyWeightLogs('2017-01-01', '7d').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(JSON.stringify(err)));
        });
    });

    it('should get body weight logs', (done) => {
        api.getBodyWeightLogs('2017-12-01').then(json => {
            expect(json.fat).to.be.an('array');
            done();
        }).catch(err => {

            done(new Error(JSON.stringify(err)));
        });
    });

});

describe('#Body Time Series', () => {
    beforeEach(() => {
        const fat = require('./fixtures/body-fat.json');
        const bmi = require('./fixtures/body-bmi.json');
        const weight = require('./fixtures/body-weight.json');

        nock(fitbitDomain)
            .get('/1/user/-/body/bmi/date/2017-01-01/1d.json')
            .reply(200, bmi);

        nock(fitbitDomain)
            .get('/1/user/-/body/bmi/date/today/2017-01-01.json')
            .reply(200, bmi);

        nock(fitbitDomain)
            .get('/1/user/-/body/fat/date/2017-01-01/1d.json')
            .reply(200, fat);

        nock(fitbitDomain)
            .get('/1/user/-/body/fat/date/today/2017-01-01/1d.json')
            .reply(200, fat);

        nock(fitbitDomain)
            .get('/1/user/-/body/weight/date/today/2017-01-01.json')
            .reply(200, weight);

        nock(fitbitDomain)
            .get('/1/user/-/body/weight/date/2017-01-01/1d.json')
            .reply(200, weight);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get body fat logs', (done) => {
        api.getBodyTimeSeries('fat', '2017-01-01').then(json => {
            expect(json['body-fat']).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body bmi logs', (done) => {
        api.getBodyTimeSeries('bmi', 'today', '2017-01-01').then(json => {
            expect(json['body-bmi']).to.be.an('array');
            done();
        }).catch(err => {
            done(new Error(err));
        });
    });

    it('should get body weight logs', (done) => {
        api.getBodyTimeSeries('weight', '2017-01-01', '1d').then(json => {
            expect(json['body-weight']).to.be.an('array');
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
            console.log(err);
            done(new Error(err));
        });
    });

    it('should get body weight goal', (done) => {
        api.getBodyGoal('weight').then(json => {
            expect(json.goal).to.be.an('object');
            done();
        }).catch(err => {
            console.log(err);
            done(new Error(err));
        });
    });

});
