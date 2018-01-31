const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Food Logging', () => {

    beforeEach(() => {
        const locales = require('./fixtures/food-locales.json');
        const goals = require('./fixtures/food-goals.json');
        const logs = require('./fixtures/food-logs.json');
        const waterLog = require('./fixtures/food-water-log.json');
        const waterGoal = require('./fixtures/food-water-goal.json');

        nock(fitbitDomain)
            .get('/1/foods/locales.json')
            .reply(200, locales);
        nock(fitbitDomain)
            .get('/1/user/-/foods/log/goal.json')
            .reply(200, goals);
        nock(fitbitDomain)
            .get('/1/user/-/foods/log/date/2017-01-01.json')
            .reply(200, logs);
        nock(fitbitDomain)
            .get('/1/user/-/foods/log/water/date/2017-01-01.json')
            .reply(200, waterLog);
        nock(fitbitDomain)
            .get('/1/user/-/foods/log/water/goal.json')
            .reply(200, waterGoal);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get food locales', (done) => {
        api.getFoodLocales().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get food goals', (done) => {
        api.getFoodGoals().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get food logs', (done) => {
        api.getFoodLogs().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get water logs', (done) => {
        api.getWaterLogs().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get water goals', (done) => {
        api.getWaterGoals().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get food time series', (done) => {
        api.getFoodTimeSeries().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get water time series', (done) => {
        api.getWaterTimeSeries().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get favorite foods', (done) => {
        api.getFavoriteFoods().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get frequent foods', (done) => {
        api.getFrequentFood().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get recent foods', (done) => {
        api.getRecentFood().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get meals', (done) => {
        api.getMeals().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get a single meal', (done) => {
        api.getMeal('meal_id').then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get food', (done) => {
        api.getFood().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });

    it('should get food units', (done) => {
        api.getFoodUnits().then(json => {
            expect(json).to.not.be.undefined;
            done();
        }).catch(err => done(new Error(JSON.stringify(err))));
    });
});
