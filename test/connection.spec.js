
const chai = require('chai');
const expect = chai.expect;
const Hypertonic = require('../src/api');

describe('#Connection', () => {
    it('should return error response if initialised with no token', (done) => {
        expect(function () { Hypertonic(); }).to.throw(Error);
        done();
    });
});

describe('#Activity Types', () => {

});

describe('#Activity Logging', () => {

});

describe('#Activity Goals', () => {

});

describe('#Lifetime Stats', () => {

});

describe('#Body and Weight', () => {

});

describe('#Devices', () => {

});

describe('#Food Logging', () => {

});

describe('#Subscriptions', () => {

});

describe('#User', () => {

});

