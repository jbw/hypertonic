const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;


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

    it('should get friends', (done) => {
    });

    it('should get invitations', (done) => {
    });

    it('should get badges', (done) => {
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
