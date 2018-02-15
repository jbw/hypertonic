import * as chai from 'chai';
import 'mocha';
const expect = chai.expect;
import Hypertonic from '../hypertonic';
const hypertonic = Hypertonic('token');
describe('#Typescript', () => {
    it.only('Main', (done) => {
        const friends = hypertonic.getFriends().then((data) => {
            console.log(data.friends[0].user.city);
            done();
        });
        const sleepLogs = hypertonic.getSleepLogs('').then((data) => {
            console.log(data.sleep[0].dateOfSleep);
            done();
        });
    });
});
