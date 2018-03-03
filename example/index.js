const fs = require('fs');
const oauth2 = require('simple-oauth2');
const express = require('express');
const Hypertonic = require('../build/hypertonic');

const fitbitConfig = require('./fitbit.json');

const serverConfig = {
    callbackHost: 'http://localhost:3000',
    callbackPath: '/auth/fitbit/callback',
    refreshPath: '/refresh',
    authPath: '/'
};

const auth = oauth2.create(fitbitConfig.fitbit);
const authUrl = auth.authorizationCode.authorizeURL({ scope: fitbitConfig.config.scopes });

const app = express();

let _token = null;

const _saveToken = (token) => {
    const savePath = './token.json';

    fs.writeFile(savePath, JSON.stringify(token, null, 2), function (err) {
        if (err) console.log(err);
        console.log('Token saved token to ' + savePath);
    });
};

app.get(serverConfig.callbackPath, (req, res) => {

    const tokenConfig = {
        code: req.query.code,
        expires_in: fitbitConfig.config.expires_in
    };

    auth.authorizationCode.getToken(tokenConfig, (err, result) => {

        if (err) return res.json(err);

        _token = auth.accessToken.create(result);
        _saveToken(_token);

        return res.status(200).json(_token);

    });
});

app.get('/example', (req, res) => {

    Hypertonic(_token).getSummary('today').then(json => {
        return res.status(200).json(json);
    }).catch(err => res.status(200).json(err));
});

app.get(serverConfig.refreshPath, (req, res) => {
    _token.refresh().then(newAccessToken => {
        _token = newAccessToken;
        return res.status(200).json(_token);
    });
});

app.get(serverConfig.authPath, (req, res) => res.redirect(authUrl));


console.log('Server started at:', serverConfig.callbackHost);
app.listen(3000);
