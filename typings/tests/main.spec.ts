
import * as nock from "nock";
import * as chai from "chai";
const expect = chai.expect;

import * as Hypertonic from "../..";
import { Friends } from "../friends";
import { SleepLogs } from "../sleeps";

const fitbitDomain = "https://api.fitbit.com";

const hypertonic = Hypertonic("");

describe("#TS Interfaces ", () => {
    beforeEach(() => {
        const friends: Friends = { friends: []};
        nock(fitbitDomain).get("/1/user/-/friends.json").reply(200,  friends);
    });

    after(() => {
        nock.cleanAll();
    });

    it("friends should be typed", (done) => {
        const friends = hypertonic.getFriends().then((data: Friends) => {
            done();
        });

    });
});

