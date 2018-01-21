const moment = require('moment');
const routes = require('./routes.json');
const nodeFetch = require('node-fetch');

const _utils = {

    getHeaderOptions: () => {
        return {
            headers: {
                'Authorization': 'Bearer '
            }
        };
    },

    getDateNow: (offset) => {
        return moment(new Date()).add(offset, 'days').format('YYYY-MM-DD');
    },

    addHeader: (name, value, headerOptions) => {
        headerOptions.headers[name] = value;
        return headerOptions;
    },

    setAuthHeader: (token, headerOptions) => {
        if (token && headerOptions.headers['Authorization'] !== undefined) {
            headerOptions.headers['Authorization'] = 'Bearer ' + token;
        }

        return headerOptions;
    },

    setLocale: (locale, headerOptions) => {
        this.addHeader('Accept-Language', locale, headerOptions);
    },

    getLocale: (headerOptions) => {
        return headerOptions.headers['Accept-Language'];
    }
};

const FitbitApi = (token) => {

    if (token === undefined) throw new Error('token is not defined.');

    let resourceParts = [];

    const getURL = () => {
        const route = resourceParts.join('/') + '.json';
        return route;
    };

    const getProfile = () => {
        return routes.profile;
    };

    const getFrequentActivities = () => {
        return getActivities(routes.activities.types.frequent.name).fetch();
    };

    const getRecentActivities = () => {
        return getActivities(routes.activities.types.recent.name).fetch();
    };

    const getFavoriteActivities = () => {
        return getActivities(routes.activities.types.favorite.name).fetch();
    };

    const getWeeklySummary = () => {
        return getActivities().from(routes.dateFormats.route.sevendays).fetch();
    };

    const getFriends = (friends) => {

        if (friends === undefined) {
            resourceParts = [routes.base, routes.friends.route];
        } else {
            resourceParts = [routes.base, routes.friends.route, friends];
        }

        return context;
    };

    const getSleepLogs = () => {
        const context = getActivities();
        resourceParts = [routes.sleep.base, routes.sleep.route, routes.dateFormats.route.name, DEFAULT_DATE];
        return context;
    };

    const getActivities = (activity) => {

        resourceParts = [routes.base, routes.activities.route];

        const DATE_FROM_OFFSET = 1;
        const DATE_TO_OFFSET = 2;

        if (activity) {
            resourceParts.push(activity);
        }

        resourceParts.push(...[routes.dateFormats.route.name, DEFAULT_DATE]);

        const from = (dateFrom) => {
            if (!dateFrom) dateFrom = _utils.getDateNow();

            const replaceIndex = resourceParts.indexOf(routes.dateFormats.route.name) + DATE_FROM_OFFSET;
            resourceParts[replaceIndex] = dateFrom;

            return context;
        };

        const to = (dateTo) => {
            if (!dateTo) dateTo = _utils.getDateNow();

            const replaceIndex = resourceParts.indexOf(routes.dateFormats.route.name) + DATE_TO_OFFSET;
            resourceParts[replaceIndex] = dateTo;

            return context;
        };

        context.to = to;
        context.from = from;

        return context;

    };

    const fetch = () => {
        const options = _utils.getHeaderOptions();
        _utils.setAuthHeader(token, options);
        return nodeFetch(context.getURL(), options)
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

    const DEFAULT_DATE = 'today';

    const context = {
        getURL,
        fetch
    };

    return {
        getActivities,
        getProfile,
        getFavoriteActivities,
        getFrequentActivities,
        getRecentActivities,
        getWeeklySummary,
        getFriends,
        getSleepLogs,
        fetch
    };
};

module.exports = FitbitApi;
