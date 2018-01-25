const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const test = require('./common.js');
const api = test.api;
const fitbitDomain = test.fitbitDomain;

describe('#Activity Goals', () => {
    beforeEach(() => {
    });

    after(() => {
        nock.cleanAll();
    });

    it('should get activity goals', (done) => {
        done(new Error());
    });
});
