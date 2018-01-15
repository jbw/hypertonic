const fs = require('fs');
const oauth2 = require('simple-oauth2');
const express = require('express');
const Hypertonic = require('../src/api');

const secrets_path = '../secrets/';
const credentials = require(secrets_path + 'fitbit.json');
let token = require(secrets_path + 'token.json').token;

const serverConfig = {
    callbackHost: 'http://localhost:3000',
    callbackPath: '/auth/fitbit/callback',
    refreshPath: '/refresh',
    authPath: '/auth'
};

const auth = oauth2.create(credentials.fitbit);
const authUrl = auth.authorizationCode.authorizeURL({ scope: credentials.config.scopes });

let _hypertonic = null;

const app = express();

app.get(serverConfig.refreshPath, (req, res) => {
    const tokenObj = auth.accessToken.create(token);

    tokenObj.refresh().then(newAccessToken => {
        token = newAccessToken;
        return res.status(200).json(token);
    });
});

app.get(serverConfig.authPath, (req, res) => res.redirect(authUrl));

app.get(serverConfig.callbackPath, (req, res) => {

    const tokenConfig = {
        code: req.query.code,
        expires_in: credentials.config.expires_in
    };

    auth.authorizationCode.getToken(tokenConfig, (err, result) => {

        if (err) return res.json(err);

        token = auth.accessToken.create(result);
        const savePath = '../secrets/token.json';

        fs.writeFile(savePath, JSON.stringify(token, null, 2), function (err) {
            if (err) console.log(err);
            console.log('Token saved token to ' + savePath);
        });

        return res.status(200).json(token);

    });

});

app.get('/example', (req, res) => {

    _hypertonic = Hypertonic(token.access_token);
    _hypertonic.getActivities().fetch().then(json => {
        return res.status(200).json(json);
    });

});

console.log('Server started at:', serverConfig.callbackHost);
app.listen(3000);
