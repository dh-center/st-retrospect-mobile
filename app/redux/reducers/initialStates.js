import i18n from 'i18n-js';

export const routesListInitialState = {
    isFetching: false,

    lastUpdated: null,

    didInvalidate: false,

    items: [],
};

export const localeInitialState = i18n.locale;

export const authTokenInitialState = '';

export const locationInitialState = {latitude: null, longitude: null};
