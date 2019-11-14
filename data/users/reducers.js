import {SAVE_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOCALE} from './action_types';

const authInitialState = {
    authToken: '',
    locale: 'en'
};


export default function authProcess(state = authInitialState, action) {
    switch (action.type) {
        case SAVE_AUTH_TOKEN:
            return Object.assign({}, state, {
                authToken: action.authToken,
            });
        case REMOVE_AUTH_TOKEN:
            return Object.assign({}, state, authInitialState);
        case SET_LOCALE:
            return Object.assign({}, state, {
                locale: action.locale,
            });
    default:
        return state
    }
}
