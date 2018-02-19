const axios = require('axios');
const appendQuery = require('append-query');

const fetch = (resourceParts, urlParams, extension = '.json') => {
    const url = getURL(resourceParts, urlParams, extension);

    return axios.get(url)
        .then(res => res.data)
        .catch(err => { throw err.response.data; });
};

const setHeaderOptions = (token, locale) => {

    axios.default.headers = {
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

module.exports = { fetch, setHeaderOptions };;
