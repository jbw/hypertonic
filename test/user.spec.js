const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#User', () => {

    beforeEach(() => {


        const userProfile = require('./fixtures/user-profile.json');
        nock(fitbitDomain)
            .get('/1/user/-/profile.json')
            .reply(200, userProfile);

        const userBadges = require('./fixtures/user-badges.json');
        nock(fitbitDomain)
            .get('/1/user/-/badges.json')
            .reply(200, userBadges);

    });

    after(() => {
        nock.cleanAll();
    });

    it('should get profile', (done) => {
        api.getProfile().then(json => {
            expect(json.user).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err)
            done(new Error());
        });
    });

    it('should get badges', (done) => {
        api.getBadges().then(json => {
            expect(json.badges).to.not.be.undefined;
        }).catch(err => {

        });
    });

});
