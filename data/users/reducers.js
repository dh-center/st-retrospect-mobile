import {SAVE_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LANGUAGE} from './action_types';

const authInitialState = {
    authToken: '',
};


export default function authProcess(state = authInitialState, action) {
    switch (action.type) {
        case SAVE_AUTH_TOKEN:
            return Object.assign({}, state, {
                authToken: action.authToken,
            });
        case REMOVE_AUTH_TOKEN:
            return Object.assign({}, state, authInitialState);
    default:
        return state
    }
}
