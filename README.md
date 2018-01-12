
## Hypertonic

Fitbit API Wrapper

### Options

`hypertonic` accepts two objects (`credentials` and `config`) which contains an authenitcation specific configurations.

The `config` object contains internal options to be used by the server configuration.

#### Application configuration object

``` javascript
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
```

| Option                   | Description                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| auth.token.access_token  | Authenication token received through oAuth2.                                                                        |
| auth.token.refresh_token | Token which allows you to keep reauthenticate when the token has expired.                                           |
| app.scopes               | Specify allowed access granted by the user. Must be a <i>space delimited string</i>.                                |
| app.callbackHost         | Portion of the web address containing the address only. Where the service redirects after authorisation is granted. |
| app.callbackPath         | Path after the host. Joined together with `app.callbackHost`.                                                       |


#### OAuth2 Credential object

External specific configurations for a Fitbit application. You can find this information on the Fitbit SDK. Used to form a oAuth request.

``` javascript
const oauth2Credentials = {
    client: {
        id: '<from_registered_app>',
        secret: '<from_registered_app>'
    },
    auth: {
        tokenHost: 'https://api.fitbit.com',
        tokenPath: '/oauth2/token',
        authorizeHost: 'https://www.fitbit.com',
        authorizePath: '/oauth2/authorize'
    }
};
```



| Option             | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| client.id          | Identifier for your application given by the oAuth server.       |
| client.secret      | Only known to the application and the authorisation server.      |
| auth.tokenHost     | Host address for fetching a token.                               |
| auth.tokenPath     | Path after the host. Joined together with `auth.tokenHost`.      |
| auth.authorizeHost | Host address for authorising the application.                    |
| auth.authorizePath | Path after the host. Joining together with `auth.authorizeHost`. |


## Example

See examples directory.

`const hypertonic = new Hypertonic(token);`

```javascript
api.getActivities().fetch().then(data =>
    res.status(200).json(data);
});
```
