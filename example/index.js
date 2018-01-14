const fs = require('fs');
const oauth2 = require('simple-oauth2');
const express = require('express');
const Hypertonic = require('../src/api');

const token = require('./secret/token.json');
const credentials = require('./secret/fitbit.json');

const config = {
    auth: token,
    app: {
        scopes: 'activity profile settings',
        expires_in: 604800,
        store: __dirname + '/secret/token.json',
        callbackHost: 'http://localhost:3000',
        callbackPath: '/auth/fitbit/callback',
        refreshPath: '/refresh',
        authPath: '/auth'
    }
};

const fitbitServer = (oauthCredentials, appConfig) => {
    const app = express();
    const auth = oauth2.create(oauthCredentials);
    const api = Hypertonic(appConfig.auth);

    const authUrl = auth.authorizationCode.authorizeURL({
        scope: appConfig.app.scopes
    });

    app.get(appConfig.app.refreshPath, (req, res) => {
        const token = appConfig.auth.token;

        const tokenObj = auth.accessToken.create(token);

        tokenObj.refresh().then(newAccessToken => {
            appConfig.auth = newAccessToken;
            return res.status(200).json(appConfig.auth);
        });
    });

    app.get(appConfig.app.authPath, (req, res) => {
        res.redirect(authUrl);
    });

    app.get(appConfig.app.callbackPath, (req, res) => {

        const tokenConfig = {
            code: req.query.code,
            expires_in: appConfig.app.expires_in
        };

        auth.authorizationCode.getToken(tokenConfig, (err, result) => {

            if (err) return res.json(err);

            appConfig.auth = auth.accessToken.create(result);

            fs.writeFile(appConfig.app.store, JSON.stringify(appConfig.auth, null, 2), function (err) {
                if (err) console.log(err);
                console.log('Token saved token to ' + appConfig.app.store);
            });

            return res.status(200).json(appConfig.auth);

        });

    });

    app.get('/example', (req, res) => {

        api.getActivities().fetch().then(json => {
            return res.status(200).json(json);
        });

    });

    app.listen(3000);

};


fitbitServer(credentials, config);
