# Hypertonic

Fitbit API Wrapper

[![CircleCI](https://circleci.com/gh/jbw/hypertonic/tree/master.svg?style=svg)](https://circleci.com/gh/jbw/hypertonic/tree/master)

`hypertonic` requires only the token to get started. How you manage authentication flow is up to you but you can see some example code in the example directory.

## Configuration

### oAuth2

External specific configurations for a Fitbit application. You can find this information on the Fitbit SDK. It is used to form an oAuth request.

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

``` javascript
const auth = oauth2.create(credentials.fitbit);
const authUrl = auth.authorizationCode.authorizeURL({ scope: credentials.config.scopes });
```

### Fitbit Token Object

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

api.getActivities().fetch().then(data =>
    res.status(200).json(data);
});
```
