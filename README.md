# Hypertonic

[![npm version](https://badge.fury.io/js/hypertonic.svg)](https://badge.fury.io/js/hypertonic)

Fitbit API Wrapper :running: :tropical_drink:

`hypertonic` is a Fitbit web api wrapper that only requires your access token to get started.



| Branch  | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| master  | [![CircleCI](https://circleci.com/gh/jbw/hypertonic/tree/master.svg?style=shield)](https://circleci.com/gh/jbw/hypertonic/tree/master)  [![Coverage Status](https://coveralls.io/repos/github/jbw/hypertonic/badge.svg?branch=master)](https://coveralls.io/github/jbw/hypertonic?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/jbw/hypertonic/badge.svg)](https://snyk.io/test/github/jbw/hypertonic) [![Bundle size](http://img.badgesize.io/jbw/hypertonic/master/src/api/index.js?compression=gzip)](http://img.badgesize.io/jbw/hypertonic/master/src/api/index.js?compression=gzip) |
| develop | [![CircleCI](https://circleci.com/gh/jbw/hypertonic/tree/develop.svg?style=shield)](https://circleci.com/gh/jbw/hypertonic/tree/master) [![Coverage Status](https://coveralls.io/repos/github/jbw/hypertonic/badge.svg?branch=develop)](https://coveralls.io/github/jbw/hypertonic?branch=master)                                                                                                                                                                                                                                                                                                                |


## Example

```javascript
const Hypertonic = require('hypertonic');

const token = '<YOUR_FITBIT_ACCESS_TOKEN>';
const hypertonic = Hypertonic(token);

// Activity Summary data
hypertonic.getSummary('today').then(data => console.log(data));

// Activity Time Series
hypertonic.getTimeSeries('calories', 'today', '7d').then(data => console.log(data));
hypertonic.getTimeSeries('steps', 'today', '1m').then(data => console.log(data));
```

## API Reference

<a name="Hypertonic"></a>

### Hypertonic(token) ⇒ <code>Function</code>

| Param | Type             |
| ----- | ---------------- |
| token | <code>any</code> |


* [Hypertonic(token)](#Hypertonic) ⇒ <code>Function</code>
    * [~getProfile()](#Hypertonic..getProfile) ⇒ <code>Promise</code>
    * [~getLifetimeStats()](#Hypertonic..getLifetimeStats) ⇒ <code>Promise</code>
    * [~getInvitations()](#Hypertonic..getInvitations) ⇒ <code>Promise</code>
    * [~getBadges()](#Hypertonic..getBadges) ⇒ <code>Promise</code>
    * [~getFrequentActivities()](#Hypertonic..getFrequentActivities) ⇒ <code>Promise</code>
    * [~getRecentActivities()](#Hypertonic..getRecentActivities) ⇒ <code>Promise</code>
    * [~getFavoriteActivities()](#Hypertonic..getFavoriteActivities) ⇒ <code>Promise</code>
    * [~getFood(foodType)](#Hypertonic..getFood) ⇒ <code>Promise</code>
    * [~getFavoriteFoods()](#Hypertonic..getFavoriteFoods) ⇒ <code>Promise</code>
    * [~getFrequentFoods()](#Hypertonic..getFrequentFoods) ⇒ <code>Promise</code>
    * [~getRecentFoods()](#Hypertonic..getRecentFoods) ⇒ <code>Promise</code>
    * [~getMeals()](#Hypertonic..getMeals) ⇒ <code>Promise</code>
    * [~getMeal(mealId)](#Hypertonic..getMeal) ⇒ <code>Promise</code>
    * [~getFoodUnits()](#Hypertonic..getFoodUnits) ⇒ <code>Promise</code>
    * [~getFoodLocales()](#Hypertonic..getFoodLocales) ⇒ <code>Promise</code>
    * [~getFoodGoals()](#Hypertonic..getFoodGoals) ⇒ <code>Promise</code>
    * [~getWaterGoals()](#Hypertonic..getWaterGoals) ⇒ <code>Promise</code>
    * [~getFoodTimeSeries(from, to)](#Hypertonic..getFoodTimeSeries) ⇒ <code>Promise</code>
    * [~getWaterTimeSeries(from, to)](#Hypertonic..getWaterTimeSeries) ⇒ <code>Promise</code>
    * [~getDevices()](#Hypertonic..getDevices) ⇒ <code>Promise</code>
    * [~getAlarms(trackerId)](#Hypertonic..getAlarms) ⇒ <code>Promise</code>
    * [~getActivityTypes()](#Hypertonic..getActivityTypes) ⇒ <code>Promise</code>
    * [~getActivityGoals(period)](#Hypertonic..getActivityGoals) ⇒ <code>Promise</code>
    * [~getActivityType(activityId)](#Hypertonic..getActivityType) ⇒ <code>Promise</code>
    * [~getBodyGoal(bodyMetric)](#Hypertonic..getBodyGoal) ⇒ <code>Promise</code>
    * [~getFriends(friends)](#Hypertonic..getFriends) ⇒ <code>Promise</code>
    * [~getActivityLogsList()](#Hypertonic..getActivityLogsList) ⇒ <code>Promise</code>
    * [~getActivityTCX(logId)](#Hypertonic..getActivityTCX) ⇒ <code>Promise</code>
    * [~getBodyFatLogs(from, to)](#Hypertonic..getBodyFatLogs) ⇒ <code>Promise</code>
    * [~getBodyWeightLogs(from, to)](#Hypertonic..getBodyWeightLogs) ⇒ <code>Promise</code>
    * [~getSleepLogs(from, to)](#Hypertonic..getSleepLogs) ⇒ <code>Promise</code>
    * [~getSummary(date)](#Hypertonic..getSummary) ⇒ <code>Promise</code>
    * [~getWaterLogs(date)](#Hypertonic..getWaterLogs) ⇒ <code>Promise</code>
    * [~getFoodLogs(date)](#Hypertonic..getFoodLogs) ⇒ <code>Promise</code>
    * [~getBodyTimeSeries(bodyMetric, from, to)](#Hypertonic..getBodyTimeSeries) ⇒ <code>Promise</code>
    * [~getTimeSeries(activity, from, to)](#Hypertonic..getTimeSeries) ⇒ <code>Promise</code>

<a name="Hypertonic..getProfile"></a>

### Hypertonic~getProfile() ⇒ <code>Promise</code>
**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getLifetimeStats"></a>

### Hypertonic~getLifetimeStats() ⇒ <code>Promise</code>
Get Lifetime Stats

The Get Lifetime Stats endpoint retrieves the user's activity statistics in the format requested using units in the unit system which corresponds to the Accept-Language header provided. Activity statistics includes Lifetime and Best achievement values from the My Achievements tile on the website dashboard. Response contains both statistics from the tracker device and total numbers including tracker data and manual activity log entries as seen on the Fitbit website dashboard.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getInvitations"></a>

### Hypertonic~getInvitations() ⇒ <code>Promise</code>
Get Friend Invitations

The Get Friend Invitations endpoint returns a list of invitations to become friends with a user in the format requested.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getBadges"></a>

### Hypertonic~getBadges() ⇒ <code>Promise</code>
Get Badges

The Get Badges endpoint retrieves user's badges in the format requested. Response includes all badges for the user as seen on the Fitbit website badge locker (both activity and weight related). Fitbit returns weight and distance badges based on the user's unit profile preference as on the website.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFrequentActivities"></a>

### Hypertonic~getFrequentActivities() ⇒ <code>Promise</code>
Get Frequent Activities

The Get Frequent Activities endpoint retrieves a list of a user's frequent activities in the format requested using units in the unit system which corresponds to the Accept-Language header provided. A frequent activity record contains the distance and duration values recorded the last time the activity was logged. The record retrieved can be used to log the activity via the Log Activity endpoint with the same or adjusted values for distance and duration.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getRecentActivities"></a>

### Hypertonic~getRecentActivities() ⇒ <code>Promise</code>
Get Recent Activity Types

The Get Recent Activity Types endpoint retrieves a list of a user's recent activities types logged with some details of the last activity log of that type using units in the unit system which corresponds to the Accept-Language header provided. The record retrieved can be used to log the activity via the Log Activity endpoint with the same or adjusted values for distance and duration.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFavoriteActivities"></a>

### Hypertonic~getFavoriteActivities() ⇒ <code>Promise</code>
Get Favorite Activities

The Get Favorite Activities endpoint returns a list of a user's favorite activities.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFood"></a>

### Hypertonic~getFood(foodType) ⇒ <code>Promise</code>
Get Food

The Get Food endpoint returns the details of a specific food in the Fitbit food database or a private food the authorized user has entered in the format requested.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param    | Type             |
| -------- | ---------------- |
| foodType | <code>any</code> |

<a name="Hypertonic..getFavoriteFoods"></a>

### Hypertonic~getFavoriteFoods() ⇒ <code>Promise</code>
Get Favorite Foods

This endpoint returns a list of a user's favorite foods in the format requested. A favorite food in the list provides a quick way to log the food via the Log Food endpoint.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFrequentFoods"></a>

### Hypertonic~getFrequentFoods() ⇒ <code>Promise</code>
Get Frequent Foods

This endpoint returns a list of a user's frequent foods in the format requested. A frequent food in the list provides a quick way to log the food via the Log Food endpoint.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getRecentFoods"></a>

### Hypertonic~getRecentFoods() ⇒ <code>Promise</code>
Get Recent Foods

The Get Recent Foods endpoint returns a list of a user's recent foods in the format requested. A recent food provides a quick way to log the food via the Log Food endpoint.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getMeals"></a>

### Hypertonic~getMeals() ⇒ <code>Promise</code>
Get Meals

This endpoint returns a list of meals created by user in his or her food log in the format requested. Meals in the list provide a quick way to log several foods at a time via the calls to the Log Food endpoint.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getMeal"></a>

### Hypertonic~getMeal(mealId) ⇒ <code>Promise</code>
Get Meal

The Get Meal endpoint retrieves a meal for a user given the meal id.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param  | Type             |
| ------ | ---------------- |
| mealId | <code>any</code> |

<a name="Hypertonic..getFoodUnits"></a>

### Hypertonic~getFoodUnits() ⇒ <code>Promise</code>
Get Food Units

The Get Food Units endpoint returns a list of all valid Fitbit food units in the format requested.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFoodLocales"></a>

### Hypertonic~getFoodLocales() ⇒ <code>Promise</code>
Get Food Locales

The Get Food Locales endpoint returns the food locales that the user may choose to search, log, and create food in.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFoodGoals"></a>

### Hypertonic~getFoodGoals() ⇒ <code>Promise</code>
Get Food Goals

The Get Food Goals endpoint returns a user's current daily calorie consumption goal and/or food Plan in the format requested.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getWaterGoals"></a>

### Hypertonic~getWaterGoals() ⇒ <code>Promise</code>
Get Water Goals

The Get Water Goals endpoint returns a user's current daily water consumption goal.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getFoodTimeSeries"></a>

### Hypertonic~getFoodTimeSeries(from, to) ⇒ <code>Promise</code>
Get Food Time Series

The Get Food or Water Time Series endpoint returns time series data in the specified range for a given resource in the format requested using units in the unit systems that corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| from  | <code>any</code> |
| to    | <code>any</code> |

<a name="Hypertonic..getWaterTimeSeries"></a>

### Hypertonic~getWaterTimeSeries(from, to) ⇒ <code>Promise</code>
Get Water Time Series

The Get Food or Water Time Series endpoint returns time series data in the specified range for a given resource in the format requested using units in the unit systems that corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| from  | <code>any</code> |
| to    | <code>any</code> |

<a name="Hypertonic..getDevices"></a>

### Hypertonic~getDevices() ⇒ <code>Promise</code>
Get Devices

The Get Device endpoint returns a list of the Fitbit devices connected to a user's account.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getAlarms"></a>

### Hypertonic~getAlarms(trackerId) ⇒ <code>Promise</code>
Get Alarms

The Get Alarms endpoint returns a list of the set alarms connected to a user's account.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param     | Type             |
| --------- | ---------------- |
| trackerId | <code>any</code> |

<a name="Hypertonic..getActivityTypes"></a>

### Hypertonic~getActivityTypes() ⇒ <code>Promise</code>
Activity Types List

Get a tree of all valid Fitbit public activities from the activities catalog as well as private custom activities the user created in the format requested. If the activity has levels, also get a list of activity level details.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getActivityGoals"></a>

### Hypertonic~getActivityGoals(period) ⇒ <code>Promise</code>
Get Activity Goals

The Get Activity Goals retrieves a user's current daily or weekly activity goals using measurement units as defined in the unit system, which corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param  | Type             |
| ------ | ---------------- |
| period | <code>any</code> |

<a name="Hypertonic..getActivityType"></a>

### Hypertonic~getActivityType(activityId) ⇒ <code>Promise</code>
Get Activity Type

Returns the details of a specific activity in the Fitbit activities database in the format requested. If activity has levels, also returns a list of activity level details.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param      | Type             |
| ---------- | ---------------- |
| activityId | <code>any</code> |

<a name="Hypertonic..getBodyGoal"></a>

### Hypertonic~getBodyGoal(bodyMetric) ⇒ <code>Promise</code>
Get Body Goals

The Get Body Goals API retrieves a user's current body fat percentage or weight goal using units in the unit systems that corresponds to the Accept-Language header provided in the format requested.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param      | Type             |
| ---------- | ---------------- |
| bodyMetric | <code>any</code> |

<a name="Hypertonic..getFriends"></a>

### Hypertonic~getFriends(friends) ⇒ <code>Promise</code>
Get Friends

The Get Friends endpoint returns data of a user's friends in the format requested using units in the unit system which corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param   | Type             | Description        |
| ------- | ---------------- | ------------------ |
| friends | <code>any</code> | e.g. 'leaderboard' |

<a name="Hypertonic..getActivityLogsList"></a>

### Hypertonic~getActivityLogsList() ⇒ <code>Promise</code>
Get Activity Logs List

The Get Activity Logs List endpoint retrieves a list of a user's activity log entries before or after a given day with offset and limit using units in the unit system which corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
<a name="Hypertonic..getActivityTCX"></a>

### Hypertonic~getActivityTCX(logId) ⇒ <code>Promise</code>
Get Activity TCX

Note: Since this is a beta feature, Fitbit may need to make backwards incompatible changes with less than 30 days notice.

The Get Activity TCX endpoint retrieves the details of a user's location and heart rate data during a logged exercise activity.

The Training Center XML (TCX) is a data exchange format that contains GPS, heart rate, and lap data, when it is available for the activity. The TCX MIME type is application/vnd.garmin.tcx+xml.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| logId | <code>any</code> |

<a name="Hypertonic..getBodyFatLogs"></a>

### Hypertonic~getBodyFatLogs(from, to) ⇒ <code>Promise</code>
Get Body Fat Logs

The Get Body Fat Logs API retrieves a list of all user's body fat log entries for a given day in the format requested. Body fat log entries are available only to authorized user. If you need to fetch only the most recent entry, you can use the Get Body Measurements endpoint.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| from  | <code>any</code> |
| to    | <code>any</code> |

<a name="Hypertonic..getBodyWeightLogs"></a>

### Hypertonic~getBodyWeightLogs(from, to) ⇒ <code>Promise</code>
Get Weight Logs

The Get Weight Logs API retrieves a list of all user's body weight log entries for a given day using units in the unit systems which corresponds to the Accept-Language header provided. Body weight log entries are available only to authorized user. Body weight log entries in response are sorted exactly the same as they are presented on the Fitbit website.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type                         |
| ------- | ----------------------------- |
| from   | <code>any</code> |
| to       | <code>any</code> |

<a name="Hypertonic..getSleepLogs"></a>

### Hypertonic~getSleepLogs(from, to) ⇒ <code>Promise</code>
Get Sleep Logs

The Get Sleep Logs by Date endpoint returns a summary and list of a user's sleep log entries (including naps) as well as detailed sleep entry data for a given day.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type |
| --- | --- |
| from | <code>any</code> |
| to | <code>any</code> |

<a name="Hypertonic..getSummary"></a>

### Hypertonic~getSummary(date) ⇒ <code>Promise</code>
Get Daily Activity Summary

The Get Daily Activity Summary endpoint retrieves a summary and
list of a user's activities and activity log entries for a given
day in the format requested using units in the unit system which
corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| date  | <code>any</code> |

<a name="Hypertonic..getWaterLogs"></a>

### Hypertonic~getWaterLogs(date) ⇒ <code>Promise</code>
Get Water Logs

The Get Water Logs endpoint retrieves a summary and list of a user's water log entries for a given day in the format requested using units in the unit system that corresponds to the Accept-Language header provided. Water log entries are available only to an authorized user.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| date  | <code>any</code> |

<a name="Hypertonic..getFoodLogs"></a>

### Hypertonic~getFoodLogs(date) ⇒ <code>Promise</code>
Get Food Logs

The Get Food Logs endpoint returns a summary and list of a user's food log entries for a given day in the format requested.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param | Type             |
| ----- | ---------------- |
| date  | <code>any</code> |

<a name="Hypertonic..getBodyTimeSeries"></a>

### Hypertonic~getBodyTimeSeries(bodyMetric, from, to) ⇒ <code>Promise</code>
Get Body Time Series

The Get Body Time Series API returns time series data in the specified range for a given resource in the format requested using units in the unit systems that corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)

| Param      | Type             |
| ---------- | ---------------- |
| bodyMetric | <code>any</code> |
| from       | <code>any</code> |
| to         | <code>any</code> |

<a name="Hypertonic..getTimeSeries"></a>

### Hypertonic~getTimeSeries(activity, from, to) ⇒ <code>Promise</code>
Get Activity Time Series

The Get Activity Time Series endpoint returns time series data in the specified range for a given resource in the format requested using units in the unit system that corresponds to the Accept-Language header provided.

**Kind**: inner method of [<code>Hypertonic</code>](#Hypertonic)
**Returns**: <code>Promise</code> - Activity time series data.

| Param    | Type             | Description                            |
| -------- | ---------------- | -------------------------------------- |
| activity | <code>any</code> | name of activity e.g. steps, heartrate |
| from     | <code>any</code> | from date                              |
| to       | <code>any</code> | to date                                |


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
