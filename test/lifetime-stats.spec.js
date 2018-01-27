const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Lifetime Stats', () => {
    beforeEach(() => {
        const lifetime = require('./fixtures/lifetime.json');
        nock(fitbitDomain)
            .get('/1/user/-/activities.json')
            .reply(200, lifetime);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get life time stats', (done) => {
        api.getLifetimeStats().then(json => {
            expect(json.lifetime).to.not.be.undefined;
            done();
        }).catch(err => {
            done(new Error(JSON.stringify(err)));
        });

    });
});
