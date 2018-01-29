const moment = require('moment');
const routes = require('./routes.json');
const fetch = require('node-fetch');

const FitbitApi = (token) => {

    if (token === undefined) throw new Error('token is not defined.');

    const DEFAULT_DATE = 'today';
    const DEFAULT_PERIOD = '1d';
    const FITBIT_DATE_FORMAT = 'YYYY-MM-DD';

    const _getHeaderOptions = (token, locale) => {
        return {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': locale
            }
        };
    };

    const _getDateNow = offset => moment(new Date()).add(offset, 'days').format(FITBIT_DATE_FORMAT);

    const _isValidDateFormat = dateString => moment(dateString, FITBIT_DATE_FORMAT).isValid();

    const _isValidDatePeriod = period => routes.dateFormats.periods.includes(period);

    const _isValidBaseDate = baseDate => routes.dateFormats.basedate.includes(baseDate);


    const getURL = (resourceParts, extension = '.json') => {
        const route = resourceParts.join('/') + extension;
        return route;
    };

    const getProfile = () => {
        const resourceParts = [
            routes.base,
            routes.user.profile.route
        ];

        return _fetch(resourceParts);
    };

    const getLifetimeStats = () => {
        const resourceParts = [
            routes.base,
            routes.activities.route
        ];

        return _fetch(resourceParts);

    };

    const getInvitations = () => {
        const resourceParts = [
            routes.base,
            routes.friends.route,
            routes.friends.type.invitations.name
        ];

        return _fetch(resourceParts);
    };

    const getBadges = () => {
        const resourceParts = [
            routes.base,
            routes.user.badges.route
        ];

        return _fetch(resourceParts);
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

    const getBodyGoal = (bodyMetric) => {

        const resourceParts = [
            routes.base,
            routes.body.route,
            routes.body.log.route,
            bodyMetric,
            routes.body.log.type.goal
        ];

        return _fetch(resourceParts);
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

    const getActivityLogsList = () => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            routes.activities.types.list.name
        ];
        return _fetch(resourceParts);
    };

    const getActivityTCX = (logId) => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            logId
        ];

        return _fetch(resourceParts, '.tcx');
    };

    const getBodyFatLogs = (from, to) => {

        if (to !== undefined) {
            if (!_isValidDateFormat(from)) {
                return _throwInvalidParameterException();
            }
        }

        const resourceParts = [
            routes.base,
            routes.body.route,
            routes.body.log.route,
            routes.body.log.type.fat,
            routes.dateFormats.route.name,
            from
        ];

        if (to) {
            resourceParts.push(to);
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

        if (date) {
            if (!(_isValidDateFormat(date) || _isValidBaseDate(date))) {
                return _throwInvalidParameterException();
            }
        }

        const resourceParts = [
            routes.base,
            routes.activities.route,
            routes.dateFormats.route.name,
            date
        ];

        return _fetch(resourceParts);
    };

    const _isFromParamterValid = (from) => _isValidBaseDate(from) || _isValidDateFormat(from);
    const _isToParamterValid = (to) => _isValidDatePeriod(to) || _isValidDateFormat(to);
    const _isFromAndToParamtersValid = (from, to) => _isFromParamterValid(from) && _isToParamterValid(to);

    const _throwInvalidParameterException = () => {
        return new Promise(function () {
            throw new Error('Functions parameters invalid');
        });
    };

    const _handleFromAndToParameter = (from, to) => {
        if (!_isFromAndToParamtersValid(from, to)) {
            return _throwInvalidParameterException();
        }
    };

    const getBodyTimeSeries = (bodyMetric, from, to) => {
        from = from || DEFAULT_DATE;
        to = to || DEFAULT_PERIOD;

        const resourceParts = [
            routes.base,
            routes.body.route,
            bodyMetric,
            routes.dateFormats.route.name,
            from,
            to
        ];

        _handleFromAndToParameter(from, to);
        return _fetch(resourceParts);
    };

    const getTimeSeries = (activity, from, to) => {
        from = from || DEFAULT_DATE;
        to = to || DEFAULT_PERIOD;

        const resourceParts = [
            routes.base,
            routes.activities.route,
            activity,
            routes.dateFormats.route.name,
            from,
            to
        ];

        return _handleFromAndToParameter(from, to) || _fetch(resourceParts);
    };

    const _fetch = (resourceParts, extension = '.json') => {
        const options = _getHeaderOptions(token);
        const url = getURL(resourceParts, extension);

        return fetch(url, options)
            .then(res => {

                const contentType = res.headers.get('content-type');

                if (res.status >= 200 && res.status < 300) {

                    if (contentType.includes('application/json')) {
                        return res.json();
                    }

                    else if (contentType.includes('application/vnd.garmin.tcx+xml')) {
                        return res.text();
                    }
                }

                return res.json().then(Promise.reject.bind(Promise));

            }).then(data => {
                return data;
            })
            .catch(err => { throw err; });
    };

    return {
        getProfile,
        getBadges,
        getFavoriteActivities,
        getFrequentActivities,
        getRecentActivities,
        getWeeklySummary,
        getFriends,
        getSleepLogs,
        getSummary,
        getTimeSeries,
        getBodyGoal,
        getBodyTimeSeries,
        getBodyFatLogs,
        getInvitations,
        getLifetimeStats,
        getActivityLogsList,
        getActivityTCX
    };
};

module.exports = FitbitApi;
