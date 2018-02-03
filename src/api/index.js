const moment = require('moment');
const routes = require('./routes.json');
const fetch = require('node-fetch');

/**
 * 
 * 
 * @param {any} token 
 * @returns {Promise} 
 */
const Hypertonic = (token) => {

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
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getProfile = () => {
        const resourceParts = [
            routes.base,
            routes.user.profile.route
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getLifetimeStats = () => {
        const resourceParts = [
            routes.base,
            routes.activities.route
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getInvitations = () => {
        const resourceParts = [
            routes.base,
            routes.friends.route,
            routes.friends.type.invitations.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getBadges = () => {
        const resourceParts = [
            routes.base,
            routes.user.badges.route
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFrequentActivities = () => {
        return getActivity(routes.activities.types.frequent.name);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getRecentActivities = () => {
        return getActivity(routes.activities.types.recent.name);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFavoriteActivities = () => {
        return getActivity(routes.activities.types.favorite.name);
    };
    /**
     * 
     * 
     * @param {any} foodType 
     * @returns {Promise} 
     */
    const getFood = (foodType) => {
        const resourceParts = [
            routes.global,
            routes.food.route,
            foodType
        ];

        return _fetch(resourceParts);
    };

    const _getFoodLogInfo = (foodType) => {
        const resourceParts = [
            routes.base,
            routes.food.route,
            routes.food.log.route,
            foodType
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFavoriteFoods = () => {
        return _getFoodLogInfo(routes.food.log.type.favorite.name);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFrequentFoods = () => {
        return _getFoodLogInfo(routes.food.log.type.frequent.name);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getRecentFoods = () => {
        return _getFoodLogInfo(routes.food.log.type.recent.name);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getMeals = () => {
        const resourceParts = [
            routes.base,
            routes.food.type.meals.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} mealId 
     * @returns {Promise} 
     */
    const getMeal = (mealId) => {
        const resourceParts = [
            routes.base,
            routes.food.type.meals.name,
            mealId
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFoodUnits = () => {
        const resourceParts = [
            routes.global,
            routes.food.route,
            routes.food.type.units.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFoodLocales = () => {
        const resourceParts = [
            routes.global,
            routes.food.route,
            routes.food.type.locales.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getFoodGoals = () => {
        const resourceParts = [
            routes.base,
            routes.food.route,
            routes.food.log.route,
            routes.food.log.type.goals.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getWaterGoals = () => {
        const resourceParts = [
            routes.base,
            routes.food.route,
            routes.food.log.route,
            routes.food.water,
            routes.food.log.type.goals.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} from 
     * @param {any} to 
     * @returns {Promise} 
     */
    const getFoodTimeSeries = (from, to) => {
        return _getFoodWaterTimeSeries(routes.food.log.route + '/' + routes.food.caloriesIn, from, to);
    };
    /**
     * 
     * 
     * @param {any} from 
     * @param {any} to 
     * @returns {Promise} 
     */
    const getWaterTimeSeries = (from, to) => {
        return _getFoodWaterTimeSeries(routes.food.log.route + '/' + routes.food.water, from, to);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getDevices = () => {
        const resourceParts = [
            routes.base,
            routes.devices.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} trackerId 
     * @returns {Promise} 
     */
    const getAlarms = (trackerId) => {
        const resourceParts = [
            routes.base,
            routes.devices.name,
            routes.devices.tracker.name,
            trackerId,
            routes.devices.alarms.name
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getActivityTypes = () => {
        const resourceParts = [
            routes.global,
            routes.activities.route
        ];

        return _fetch(resourceParts);
    };

    /**
     * 
     * 
     * @param {any} period 
     * @returns {Promise} 
     */
    const getActivityGoals = (period) => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            routes.activities.types.goals.name,
            period
        ];

        return _fetch(resourceParts);

    };
    /**
     * 
     * 
     * @param {any} activityId 
     * @returns {Promise} 
     */
    const getActivityType = (activityId) => {
        const resourceParts = [
            routes.global,
            routes.activities.route,
            activityId
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} bodyMetric 
     * @returns {Promise} 
     */
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
    /**
     * 
     * 
     * @param {any} friends 
     * @returns {Promise} 
     */
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
    /**
     * 
     * 
     * @returns {Promise} 
     */
    const getActivityLogsList = () => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            routes.activities.types.list.name
        ];
        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} logId 
     * @returns {Promise} 
     */
    const getActivityTCX = (logId) => {
        const resourceParts = [
            routes.base,
            routes.activities.route,
            logId
        ];

        return _fetch(resourceParts, '.tcx');
    };
    /**
     * 
     * 
     * @param {any} from 
     * @param {any} to 
     * @returns {Promise} 
     */
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
    /**
     * 
     * 
     * @param {any} from 
     * @returns {Promise} 
     */
    const getSleepLogs = (from) => {

        const resourceParts = [
            routes.sleep.base,
            routes.sleep.route,
            routes.dateFormats.route.name,
            from || DEFAULT_DATE
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} activity 
     * @returns {Promise} 
     */
    const getActivity = (activity) => {

        const resourceParts = [
            routes.base,
            routes.activities.route,
            activity
        ];

        return _fetch(resourceParts);
    };
    /**
     * 
     * 
     * @param {any} date 
     * @returns {Promise} 
     */
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
    /**
     * 
     * 
     * @param {any} date 
     * @returns {Promise} 
     */
    const getWaterLogs = (date) => {
        return _getFoodWaterLog(routes.food.log.route + '/' + routes.food.water, date);
    };
    /**
     * 
     * 
     * @param {any} date 
     * @returns {Promise} 
     */
    const getFoodLogs = (date) => {
        return _getFoodWaterLog(routes.food.log.route, date);
    };

    const _getFoodWaterLog = (type, date) => {

        if (date) {
            if (!(_isValidDateFormat(date) || _isValidBaseDate(date))) {
                return _throwInvalidParameterException();
            }
        }

        const resourceParts = [
            routes.base,
            routes.food.route,
            type,
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
    /**
     * 
     * 
     * @param {any} bodyMetric 
     * @param {any} from 
     * @param {any} to 
     * @returns {Promise} 
     */
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

    /**
     * Activity Time Series
     * 
     * @param {any} activity 
     * @param {any} from 
     * @param {any} to 
     * @returns {Promise} Activity time series data.
     */
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

    const _getFoodWaterTimeSeries = (activity, from, to) => {
        from = from || DEFAULT_DATE;
        to = to || DEFAULT_PERIOD;

        const resourceParts = [
            routes.base,
            routes.food.route,
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
        getActivityTCX,
        getActivityType,
        getActivityTypes,
        getActivityGoals,
        getDevices,
        getAlarms,
        getFood,
        getFrequentFoods,
        getFavoriteFoods,
        getRecentFoods,
        getMeal,
        getMeals,
        getFoodGoals,
        getFoodLocales,
        getFoodUnits,
        getWaterGoals,
        getFoodTimeSeries,
        getWaterTimeSeries,
        getFoodLogs,
        getWaterLogs

    };
};

module.exports = Hypertonic;
