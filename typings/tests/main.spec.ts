import * as chai from 'chai';
import 'mocha';
const expect = chai.expect;
import * as nock from 'nock';

import Hypertonic from '../hypertonic';
import { Friends } from '../friends';
import { SleepLogs } from '../sleeps';


const hypertonic = Hypertonic('token');

describe('#Typescript', () => {

    it.only('Main', (done: any) => {

        const friends = hypertonic.getFriends().then((data: Friends) => {
            console.log(data.friends[0].user.city);
            done()
        });

        const sleepLogs = hypertonic.getSleepLogs('').then((data: SleepLogs) => {
            console.log(data.sleep[0].dateOfSleep);
            done()
        });
    });
});

