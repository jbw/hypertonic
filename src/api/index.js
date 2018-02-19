const axios = require('axios');
const appendQuery = require('append-query');
const routes = require('./routes.json');


/**
 * Fitbit Web API Wrapper
 *
 * @param {any} token
 * @returns
 */




    const fetch = (resourceParts, urlParams, extension = '.json') => {
        const url = getURL(resourceParts, urlParams, extension);

        return axios.get(url)
            .then(res => res.data)
            .catch(err => { throw err.response.data; });
    };

    const getHeaderOptions = (token, locale) => {

        return {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept-Language': locale
            }
        };
    };


const getURL = (resourceParts, urlParams, extension = '.json') => {
    let route = resourceParts.join('/') + extension;
    if (urlParams) {
        route = appendQuery(route, urlParams);
    }
    return route;
};

const DEFAULT_DATE = 'today';
const DEFAULT_PERIOD = '1d';
const FITBIT_DATE_FORMAT = 'YYYY-MM-DD';

const isValidDate = date => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return date.match(regex) !== null;
};

const isValidDateFormat = dateString => isValidDate(dateString, FITBIT_DATE_FORMAT);

const isValidDatePeriod = period => routes.dateFormats.parameters.periods.includes(period);

const isValidBaseDate = baseDate => routes.dateFormats.parameters.baseDates.includes(baseDate);

const isFromParamterValid = (from) => isValidBaseDate(from) || isValidDateFormat(from);
const isToParamterValid = (to) => isValidDatePeriod(to) || isValidDateFormat(to);
const isFromAndToParamtersValid = (from, to) => isFromParamterValid(from) && isToParamterValid(to);

const throwInvalidParameterException = () => {
    return new Promise(function () {
        throw new Error('Functions parameters invalid');
    });
};

const handleFromAndToParameter = (from, to) => {
    if (!isFromAndToParamtersValid(from, to)) {
        return throwInvalidParameterException();
    }
};

const Hypertonic = (token) => {


    if (token === undefined) throw new Error('token is not defined.');
    axios.default.headers = getHeaderOptions(token);

    /**
    * Get a User Profile data.
    *
    * @returns {Promise}
    */
    const getProfile = () => {
        const resourceParts = [
            routes.userBase,
            routes.user.resource.profile
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Lifetime Stats
     *
     * The Get Lifetime Stats endpoint retrieves the user's activity statistics.
     *
     * @returns {Promise}
     */
    const getLifetimeStats = () => {
        const resourceParts = [
            routes.userBase,
            routes.activities.route
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Friend Invitations
     *
     * The Get Friend Invitations endpoint returns a list of invitations to become friends.
     * @returns {Promise}
     */
    const getInvitations = () => {
        const resourceParts = [
            routes.userBase,
            routes.friends.route,
            routes.friends.resource.invitations
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Badges
     *
     * The Get Badges endpoint retrieves user's badges in the format requested.
     *
     * @returns {Promise}
     */
    const getBadges = () => {
        const resourceParts = [
            routes.userBase,
            routes.user.resource.badges
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Frequent Activities
     *
     * The Get Frequent Activities endpoint retrieves a list of a user's frequent activities.
     *
     * @returns {Promise}
     */
    const getFrequentActivities = () => {
        return _getActivity(routes.activities.resource.frequent);
    };

    /**
     * Get Recent Activity Types
     *
     * The Get Recent Activity Types endpoint retrieves a list of a user's recent activities types logged with some details of the last activity log of that type.
     *
     * @returns {Promise}
     */
    const getRecentActivities = () => {
        return _getActivity(routes.activities.resource.recent);
    };

    /**
     * Get Favorite Activities
     *
     * The Get Favorite Activities endpoint returns a list of a user's favorite activities.
     * @returns {Promise}
     */
    const getFavoriteActivities = () => {
        return _getActivity(routes.activities.resource.favorite);
    };

    /**
     * Get Food
     *
     * The Get Food endpoint returns the details of a specific food in the Fitbit food database or a private food the authorized user has entered in the format requested.
     * @param {any} foodType
     * @returns {Promise}
     */
    const getFood = (foodType) => {
        const resourceParts = [
            routes.globalBase,
            routes.food.route,
            foodType
        ];

        return fetch(resourceParts);
    };

    const _getFoodLogInfo = (foodType) => {
        const resourceParts = [
            routes.userBase,
            routes.food.route,
            routes.food.resource.log.route,
            foodType
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Favorite Foods
     *
     * This endpoint returns a list of a user's favorite foods in the format requested. A favorite food in the list provides a quick way to log the food via the Log Food endpoint.
     * @returns {Promise}
     */
    const getFavoriteFoods = () => {
        return _getFoodLogInfo(routes.food.resource.log.resource.favorite);
    };

    /**
     * Get Frequent Foods
     *
     * This endpoint returns a list of a user's frequent foods in the format requested. A frequent food in the list provides a quick way to log the food via the Log Food endpoint.
     * @returns {Promise}
     */
    const getFrequentFoods = () => {
        return _getFoodLogInfo(routes.food.resource.log.resource.frequent);
    };

    /**
     * Get Recent Foods
     *
     * The Get Recent Foods endpoint returns a list of a user's recent foods in the format requested. A recent food provides a quick way to log the food via the Log Food endpoint.
     * @returns {Promise}
     */
    const getRecentFoods = () => {
        return _getFoodLogInfo(routes.food.resource.log.resource.recent);
    };

    /**
     * Get Meals
     *
     * This endpoint returns a list of meals created by user in his or her food log in the format requested. Meals in the list provide a quick way to log several foods at a time via the calls to the Log Food endpoint.
     * @returns {Promise}
     */
    const getMeals = () => {
        const resourceParts = [
            routes.userBase,
            routes.food.resource.meals
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Meal
     *
     * The Get Meal endpoint retrieves a meal for a user given the meal id.
     * @param {any} mealId
     * @returns {Promise}
     */
    const getMeal = (mealId) => {
        const resourceParts = [
            routes.userBase,
            routes.food.resource.meals,
            mealId
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Food Units
     *
     * The Get Food Units endpoint returns a list of all valid Fitbit food units in the format requested.
     * @returns {Promise}
     */
    const getFoodUnits = () => {
        const resourceParts = [
            routes.globalBase,
            routes.food.route,
            routes.food.resource.units
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Food Locales
     *
     * The Get Food Locales endpoint returns the food locales that the user may choose to search, log, and create food in.
     * @returns {Promise}
     */
    const getFoodLocales = () => {
        const resourceParts = [
            routes.globalBase,
            routes.food.route,
            routes.food.resource.locales
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Food Goals
     *
     * The Get Food Goals endpoint returns a user's current daily calorie consumption goal and/or food Plan in the format requested.
     *
     * @returns {Promise}
     */
    const getFoodGoals = () => {
        const resourceParts = [
            routes.userBase,
            routes.food.route,
            routes.food.resource.log.route,
            routes.food.resource.log.resource.goal
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Water Goals
     *
     * The Get Water Goals endpoint returns a user's current daily water consumption goal.
     * @returns {Promise}
     */
    const getWaterGoals = () => {
        const resourceParts = [
            routes.userBase,
            routes.food.route,
            routes.food.resource.log.route,
            routes.food.resource.water,
            routes.food.resource.log.resource.goal
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Food Time Series
     *
     * The Get Food or Water Time Series endpoint returns time series data in the specified range.
     * @param {any} from
     * @param {any} to
     * @returns {Promise}
     */
    const getFoodTimeSeries = (from, to) => {
        return _getFoodWaterTimeSeries(routes.food.resource.log.route + '/' + routes.food.resource.caloriesIn, from, to);
    };

    /**
     * Get Water Time Series
     *
     * The Get Food or Water Time Series endpoint returns time series data in the specified range.
     * @param {any} from
     * @param {any} to
     * @returns {Promise}
     */
    const getWaterTimeSeries = (from, to) => {
        return _getFoodWaterTimeSeries(routes.food.resource.log.route + '/' + routes.food.resource.water, from, to);
    };

    /**
     * Get Devices
     *
     * The Get Device endpoint returns a list of the Fitbit devices connected to a user's account.
     * @returns {Promise}
     */
    const getDevices = () => {
        const resourceParts = [
            routes.userBase,
            routes.devices.route
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Alarms
     *
     * The Get Alarms endpoint returns a list of the set alarms connected to a user's account.
     * @param {any} trackerId
     * @returns {Promise}
     */
    const getAlarms = (trackerId) => {
        const resourceParts = [
            routes.userBase,
            routes.devices.route,
            routes.devices.resource.tracker,
            trackerId,
            routes.devices.resource.alarms
        ];

        return fetch(resourceParts);
    };

    /**
     * Activity Types List
     *
     * Get a tree of all valid Fitbit public activities from the activities catalog as well as private custom activities the user created in the format requested.
     * @returns {Promise}
     */
    const getActivityTypes = () => {
        const resourceParts = [
            routes.globalBase,
            routes.activities.route
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Activity Goals
     *
     * The Get Activity Goals retrieves a user's current daily or weekly activity goals.
     * @param {any} period
     * @returns {Promise}
     */
    const getActivityGoals = (period) => {
        const resourceParts = [
            routes.userBase,
            routes.activities.route,
            routes.activities.resource.goals,
            period
        ];

        return fetch(resourceParts);

    };

    /**
     * Get Activity Type
     *
     * Returns the details of a specific activity in the Fitbit activities database in the format requested.
     *
     * @param {any} activityId
     * @returns {Promise}
     */
    const getActivityType = (activityId) => {
        const resourceParts = [
            routes.globalBase,
            routes.activities.route,
            activityId
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Body Goals
     *
     * The Get Body Goals API retrieves a user's current body fat percentage or weight goal.
     *
     * @param {any} bodyMetric
     * @returns {Promise}
     */
    const getBodyGoal = (bodyMetric) => {

        const resourceParts = [
            routes.userBase,
            routes.body.route,
            routes.body.resource.log.route,
            bodyMetric,
            routes.body.resource.log.resource.goal
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Friends
     *
     * The Get Friends endpoint returns data of a user's friends.
     * @param {any} friends e.g. 'leaderboard'
     * @returns {Promise}
     */
    const getFriends = (friends) => {

        const resourceParts = [
            routes.userBase,
            routes.friends.route
        ];

        if (friends) {
            resourceParts.push(friends);
        }

        return fetch(resourceParts);
    };

    /**
     * Get Activity Logs List
     *
     * The Get Activity Logs List endpoint retrieves a list of a user's activity log entries before or after a given day with offset and limit.
     * @returns {Promise}
     */
    const getActivityLogsList = () => {
        const resourceParts = [
            routes.userBase,
            routes.activities.route,
            routes.activities.resource.list
        ];
        return fetch(resourceParts);
    };

    /**
     * Get Activity TCX
     *
     * The Get Activity TCX endpoint retrieves the details of a user's location and heart rate data during a logged exercise activity.
     *
     * @param {any} logId
     * @returns {Promise}
     */
    const getActivityTCX = (logId) => {
        const resourceParts = [
            routes.userBase,
            routes.activities.route,
            logId
        ];

        return fetch(resourceParts, undefined, '.tcx');
    };

    /**
     * Get Body Fat Logs
     *
     * The Get Body Fat Logs API retrieves a list of all user's body fat log entries for a given day in the format requested.
     *
     * @param {any} from
     * @param {any} to
     * @returns {Promise}
     */
    const getBodyFatLogs = (from, to) => {
        if (to !== undefined) {
            if (!isValidDateFormat(from)) {
                return throwInvalidParameterException();
            }
        }

        const resourceParts = [
            routes.userBase,
            routes.body.route,
            routes.body.resource.log.route,
            routes.body.resource.log.resource.fat,
            routes.dateFormats.route,
            from
        ];

        if (to) {
            resourceParts.push(to);
        }

        return fetch(resourceParts);
    };

    /**
     * Get Weight Logs
     *
     * The Get Weight Logs API retrieves a list of all user's body weight log entries for a given day.
     * Body weight log entries are available only to authorized user. Body weight log entries in response are sorted exactly the same as they are presented on the Fitbit website.
     * @param {any} from
     * @param {any} to
     * @returns {Promise}
    */
    const getBodyWeightLogs = (from, to) => {

        if (to !== undefined) {
            if (!isValidDateFormat(from)) {
                return throwInvalidParameterException();
            }
        }

        const resourceParts = [
            routes.userBase,
            routes.body.route,
            routes.body.resource.log.route,
            routes.body.resource.log.resource.weight,
            routes.dateFormats.route,
            from
        ];

        if (to) {
            resourceParts.push(to);
        }

        return fetch(resourceParts);
    };


    /**
     * Get Sleep Logs
     *
     * The Get Sleep Logs by Date endpoint returns a summary and list of a user's sleep log entries (including naps) as well as detailed sleep entry data for a given day.
     * @param {any} from
     * @param {any} to
     * @returns {Promise}
     */
    const getSleepLogs = (from, to) => {

        const resourceParts = [
            routes.sleep.userBase,
            routes.sleep.route,
            routes.dateFormats.route,
            from || DEFAULT_DATE
        ];

        if (to) {
            resourceParts.push(to);
        }

        return fetch(resourceParts);
    };

    /**
     * Get Sleep Logs List
     *
     * The Get Sleep Logs List endpoint returns a list of a user's sleep logs (including naps) before or after a given day with offset, limit, and sort order.
     * @returns {Promise}
     */
    const getSleepLogsList = (beforeDate, afterDate, sort, offset, limit) => {
        const resourceParts = [
            routes.sleep.userBase,
            routes.sleep.route,
            routes.sleep.resource.list
        ];

        return fetch(resourceParts, { beforeDate, afterDate, sort, offset, limit });
    };

    /**
     * Get Sleep Goal
     *
     * The Get Sleep Goal endpoint returns a user's current sleep goal using unit.
     * @returns {Promise}
     */
    const getSleepGoal = () => {
        const resourceParts = [
            routes.userBase,
            routes.sleep.route,
            routes.sleep.resource.goal
        ];

        return fetch(resourceParts);
    };

    const _getActivity = (activity) => {

        const resourceParts = [
            routes.userBase,
            routes.activities.route,
            activity
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Daily Activity Summary
     *
     * The Get Daily Activity Summary endpoint retrieves a summary and list of a user's activities and activity log entries for a given day.
     *
     * @param {any} date
     * @returns {Promise}
     */
    const getSummary = (date) => {

        date = date || DEFAULT_DATE;

        if (!(isValidDateFormat(date) || isValidBaseDate(date))) {
            return throwInvalidParameterException();
        }

        const resourceParts = [
            routes.userBase,
            routes.activities.route,
            routes.dateFormats.route,
            date
        ];

        return fetch(resourceParts);
    };

    /**
     * Get Water Logs
     *
     * The Get Water Logs endpoint retrieves a summary and list of a user's water log entries for a given day.
     *
     * @param {any} date
     * @returns {Promise}
     */
    const getWaterLogs = (date) => {
        return _getFoodWaterLog(routes.food.resource.log.route + '/' + routes.food.resource.water, date);
    };

    /**
     * Get Food Logs
     *
     * The Get Food Logs endpoint returns a summary and list of a user's food log entries for a given day.
     * @param {any} date
     * @returns {Promise}
     */
    const getFoodLogs = (date) => {
        return _getFoodWaterLog(routes.food.resource.log.route, date);
    };

    const _getFoodWaterLog = (type, date) => {

        if (date) {
            if (!(isValidDateFormat(date) || isValidBaseDate(date))) {
                return throwInvalidParameterException();
            }
        }

        const resourceParts = [
            routes.userBase,
            routes.food.route,
            type,
            routes.dateFormats.route,
            date
        ];

        return fetch(resourceParts);
    };




    /**
     * Get Body Time Series
     *
     * The Get Body Time Series API returns time series data in the specified range.
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
            routes.userBase,
            routes.body.route,
            bodyMetric,
            routes.dateFormats.route,
            from,
            to
        ];

        handleFromAndToParameter(from, to);
        return fetch(resourceParts);
    };

    /**
     * Get Activity Time Series
     *
     * The Get Activity Time Series endpoint returns time series data in the specified range.
     *
     * @param {any} activity name of activity e.g. steps, heartrate
     * @param {any} from from date
     * @param {any} to to date
     * @returns {Promise} Activity time series data.
     */
    const getTimeSeries = (activity, from, to) => {
        from = from || DEFAULT_DATE;
        to = to || DEFAULT_PERIOD;

        const resourceParts = [
            routes.userBase,
            routes.activities.route,
            activity,
            routes.dateFormats.route,
            from,
            to
        ];

        return handleFromAndToParameter(from, to) || fetch(resourceParts);
    };

    const _getFoodWaterTimeSeries = (activity, from, to) => {
        from = from || DEFAULT_DATE;
        to = to || DEFAULT_PERIOD;

        const resourceParts = [
            routes.userBase,
            routes.food.route,
            activity,
            routes.dateFormats.route,
            from,
            to
        ];

        return handleFromAndToParameter(from, to) || fetch(resourceParts);
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
        getWaterLogs,
        getBodyWeightLogs,
        getSleepGoal,
        getSleepLogsList

    };
};


module.exports = Hypertonic;
