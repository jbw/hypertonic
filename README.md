# Hypertonic

Fitbit API Wrapper

[![CircleCI](https://circleci.com/gh/jbw/hypertonic/tree/master.svg?style=svg)](https://circleci.com/gh/jbw/hypertonic/tree/master)

[![Coverage Status](https://coveralls.io/repos/github/jbw/hypertonic/badge.svg?branch=master)](https://coveralls.io/github/jbw/hypertonic?branch=master)

`hypertonic` requires only the token to get started. How you manage authentication flow is up to you but you can see some example code in the example directory.

## Configuration

### oAuth2

External specific configurations for a Fitbit application. You can find this information on the Fitbit SDK. It is used to form an oAuth request. Get your `client.id` and `client.secret` from your registered application on https://dev.fitbit.com/

``` json
{
    "fitbit": {
        "client": {
            "id": "0",
            "secret": "0"
        },
        "auth": {
            "tokenHost": "https://api.fitbit.com",
            "tokenPath": "/oauth2/token",
            "authorizeHost": "https://www.fitbit.com",
            "authorizePath": "/oauth2/authorize"
        }
    },
    "config": {
        "scopes": "activity profile settings social heartrate sleep",
        "expires_in": 604800
    }
}
```

| Option                   | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| client.id                | Identifier for your application given by the oAuth server.                           |
| client.secret            | Only known to the application and the authorisation server.                          |
| auth.tokenHost           | Host address for fetching a token.                                                   |
| auth.tokenPath           | Path after the host. Joined together with `auth.tokenHost`.                          |
| auth.authorizeHost       | Host address for authorising the application.                                        |
| auth.authorizePath       | Path after the host. Joining together with `auth.authorizeHost`.                     |
| auth.token.access_token  | Authenication token received through oAuth2.                                         |
| auth.token.refresh_token | Token which allows you to keep reauthenticate when the token has expired.            |
| app.scopes               | Specify allowed access granted by the user. Must be a <i>space delimited string</i>. |

You can find some sample configuration files located in the `secrets_template/` directory. This contains:
* `fitbit.json` which contains auth properties (that must be kept secret)
* `token.json` which is the structure of the recieved token object from Fitbit


``` javascript
const auth = oauth2.create(credentials.fitbit);
const authUrl = auth.authorizationCode
                        .authorizeURL({ scope: credentials.config.scopes });
```

### Fitbit Token Object

Once you authenticate with Fitbit you will recieve an object which looks like the below code snippet. Hypertonic accepts the access_token value (e.g. `new Hypertonic(token.access_token)`).

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

### Example

```javascript
const hypertonic = new Hypertonic(token);

// Activity Summary data
api.getSummary('today').then(data => console.log(data));

// Activity Time Series
api.getTimeSeries('calories', 'today', '7d').then(data => console.log(data));
api.getTimeSeries('steps', 'today', '1m').then(data => console.log(data));
```
