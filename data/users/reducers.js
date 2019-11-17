import {SAVE_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOCALE} from './action_types';
import i18n from 'i18n-js';
import {combineReducers} from 'redux';



function authToken(state='', action) {
    switch (action.type) {
        case SAVE_AUTH_TOKEN:
            return action.authToken;
        case REMOVE_AUTH_TOKEN:
            return '';
    default:
        return state;
    }
}


function locale(state=i18n.locale, action) {
    switch (action.type) {
        case SET_LOCALE:
            return action.locale;
    default:
        return state;
    }
}

const appFlow = combineReducers({
    authToken,
    locale
});

export default appFlow;
