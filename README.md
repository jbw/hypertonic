# Hypertonic

Fitbit API Wrapper :running: :tropical_drink:

[![CircleCI](https://circleci.com/gh/jbw/hypertonic/tree/master.svg?style=shield)](https://circleci.com/gh/jbw/hypertonic/tree/master) [![Coverage Status](https://coveralls.io/repos/github/jbw/hypertonic/badge.svg?branch=master)](https://coveralls.io/github/jbw/hypertonic?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/jbw/hypertonic/badge.svg)](https://snyk.io/test/github/jbw/hypertonic)

`hypertonic` requires only the token to get started. How you manage authentication flow is up to you but you can see some example code in the example directory.


## Example

```javascript
const Hypertonic = require('hypertonic');

const token = '<YOUR_FITBIT_ACCESS_TOKEN>';
const hypertonic = `hypertonic` (token);

// Activity Summary data
api.getSummary('today').then(data => console.log(data));

// Activity Time Series
api.getTimeSeries('calories', 'today', '7d').then(data => console.log(data));
api.getTimeSeries('steps', 'today', '1m').then(data => console.log(data));
```

## API Reference


## How can I get my token?

A working example can be found in the example directory.
### OAuth 2

First off, to be able to authenticate and get your access token, you will need a <b>client id and secret</b> from [Fitbit](https://dev.fitbit.com/). This example uses `simple-oauth2`. The JSON object below contains the necessary information needed to authenticate.

``` json
{
    "credentials": {
        "client": {
            "id": "<FROM_FITBIT>",
            "secret": "<FROM_FITBIT>"
        },
        "auth": {
            "tokenHost": "https://api.fitbit.com",
            "tokenPath": "/oauth2/token",
            "authorizeHost": "https://www.fitbit.com",
            "authorizePath": "/oauth2/authorize"
        }
    },
    "settings": {
        "scopes": "activity profile settings social heartrate sleep",
        "expires_in": 604800
    }
}
```

| Option        | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| client id     | Identifier for your application given by the OAuth server.                       |
| client secret | Only known to the application and the authorisation server.                      |
| scopes        | Specify API access granted to the user. Must be a <i>space delimited string</i>. |



``` javascript
const auth = oauth2.create(fitbit.credentials);
const authUrl = auth.authorizationCode
                        .authorizeURL({ scope: fitbit.settings.scopes });
```

### Fitbit Token Object

Once you authenticate with Fitbit you will receive an object which looks like the below code snippet. `hypertonic`  accepts the access_token value (e.g. `new `hypertonic` (token.access_token)`).

```json
{
    "token": {
        "access_token": "",
        "expires_in": 604800,
        "refresh_token": "",
        "scope": "",
        "token_type": "Bearer",
        "user_id": "",
        "expires_at": ""
    }
}
```
