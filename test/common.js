const Hypertonic = require('../src/api');

const token = process.env.NOCK_OFF ? require('../secrets/token.json').token.access_token : 'NO_TOKEN';

const fitbitDomain = 'https://api.fitbit.com';
const api = Hypertonic(token);

module.exports = {
    fitbitDomain,
    api
};