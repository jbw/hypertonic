const moment = require('moment');
const routes = require('./routes.json');
const fetch = require('node-fetch');

const FitbitApi = (token) => {

    if (token === undefined) throw new Error('token is not defined.');

    const DEFAULT_DATE = 'today';

    const _getHeaderOptions = (token, locale) => {
        return {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': locale
            }
        };
    };

    const _getDateNow = (offset) => {
        return moment(new Date()).add(offset, 'days').format('YYYY-MM-DD');
    };

    const getURL = (resourceParts) => {
        const route = resourceParts.join('/') + '.json';
        return route;
    };

    const getProfile = () => {
        throw 'not implemented';
    };

    const getFrequentActivities = () => {
        return getSummary(routes.activities.types.frequent.name);
    };

    const getRecentActivities = () => {
        return getSummary(routes.activities.types.recent.name);
    };

    const getFavoriteActivities = () => {
        return getSummary(routes.activities.types.favorite.name);
    };

    const getWeeklySummary = () => {
        return getSummary().from(routes.dateFormats.route.sevendays);
    };

    const getFriends = (friends) => {

        const resourceParts = [
            routes.base,
            routes.friends.route
        ];

        if (friends) {
            resourceParts.push(friends);
        }

        return _fetch(resourceParts);
    };

    const getSleepLogs = (from) => {

        const resourceParts = [
            routes.sleep.base,
            routes.sleep.route,
            routes.dateFormats.route.name,
            from || DEFAULT_DATE

        ];

        return _fetch(resourceParts);
    };

    const getSummary = (date) => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            routes.dateFormats.route.name
        ];

        if (date) {
            resourceParts.push(date);
        }

        return _fetch(resourceParts);
    };

    const getTimeSeries = (activity, from, to) => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            activity,
            routes.dateFormats.route.name,
            from || DEFAULT_DATE

        ];

        if(to) resourceParts.push(to);

        return _fetch(resourceParts);
    };

    const _fetch = (resourceParts) => {
        const options = _getHeaderOptions(token);
        const url = getURL(resourceParts);

        return fetch(url, options)
            .then(res => {
                return res.json();
            }).then(json => {
                if (json.errors !== undefined) throw json.errors;
                return json;
            })
            .catch(err => {
                throw err;
            });
    };

    return {
        getProfile,
        getFavoriteActivities,
        getFrequentActivities,
        getRecentActivities,
        getWeeklySummary,
        getFriends,
        getSleepLogs,
        getSummary,
        getTimeSeries
    };
};

module.exports = FitbitApi;
