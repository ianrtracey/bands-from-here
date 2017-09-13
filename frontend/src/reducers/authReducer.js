const _ = require('lodash');

const getInitialState = () => {
    const pathParams = getAuthFromPath();
    if (pathParams) {
        return pathParams;
    }
    const localStorageParams = getAuthFromLocalStorage();
    if (localStorageParams) {
        return localStorageParams;
    }
    return {
        'access_token': null,
        'refresh_token': null,
    }
}

const getAuthFromPath = () => {
    if (window.location.search !== "") {
        const params = {};
        const queryParams = window.location.search.slice(1);
        queryParams
            .split('&')
            .map((token) => token.split('='))
            .forEach((pair) => {
                params[pair[0]] = pair[1];
            })
        window.localStorage.setItem('access_token', params['access_token']);
        window.localStorage.setItem('refresh_token', params['refresh_token']);
        return params;

    }
    return null;
};

const getAuthFromLocalStorage = () => {
    const accessToken = window.localStorage.getItem('access_token');
    const refreshToken = window.localStorage.getItem('refresh_token');
    return {
        'access_token': accessToken,
        'refresh_token': refreshToken,
    }
};


export function authReducer(state = getInitialState(), action) {
    console.log('auth', state.auth)
    return state;
}