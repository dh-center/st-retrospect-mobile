import {SAVE_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOCALE} from './action_types';
import i18n from 'i18n-js';

const authInitialState = {
    authToken: '',
    locale: i18n.locale
};


export default function authProcess(state = authInitialState, action) {
    switch (action.type) {
        case SAVE_AUTH_TOKEN:
            console.log("Saving auth token");
            console.log("Current state ", state);
            console.log("Setting ", {
                authToken: action.authToken,
                locale: state.locale
            });
            return Object.assign({}, state, {
                authToken: action.authToken,
                locale: state.locale
            });
        case REMOVE_AUTH_TOKEN:
            console.log("Removing auth token");
            console.log("Current state ", state);
            console.log("Setting ", authInitialState);
            return Object.assign({}, state, authInitialState);
        case SET_LOCALE:
            console.log("Setting locale");
            console.log("Current state ", state);
            console.log("Setting ", {
                authToken: state.authToken,
                locale: action.locale
            });
            return Object.assign({}, state, {
                authToken: state.authToken,
                locale: action.locale,
            });
    default:
        return state
    }
}
