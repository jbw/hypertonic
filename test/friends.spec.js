const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;


describe('#Friends', () => {
    beforeEach(() => {
        const getFriendsLeaderboard = require('./fixtures/friends-leaderboard.json');
        const invitations = require('./fixtures/friends-invitations.json');
        const friends = require('./fixtures/friends.json');

        nock(fitbitDomain)
            .get('/1/user/-/friends/leaderboard.json')
            .reply(200, getFriendsLeaderboard);
        nock(fitbitDomain).get('/1/user/-/friends.json').reply(200, friends);
        nock(fitbitDomain).get('/1/user/-/friends/invitations.json').reply(200, invitations);
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get friends', (done) => {
        api.getFriends().then(json => {
            expect(json.friends).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
    });

    it('should get invitations', (done) => {

        api.getInvitations().then(json => {
            expect(json.friends).to.not.be.undefined;
            done();
        }).catch(err => {
            console.log(err);
            done(new Error());
        });
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
