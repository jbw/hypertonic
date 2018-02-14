import Hypertonic from '../..';
import { Friends } from '../friends';
import { SleepLogs } from '../sleeps';

const hypertonic = Hypertonic('token');

const friends = hypertonic.getFriends().then((data: Friends) => {
    console.log(data.friends[0].user.city);
});

const sleepLogs = hypertonic.getSleepLogs('').then((data: SleepLogs) => {
    console.log(data.sleep[0].dateOfSleep);
});

