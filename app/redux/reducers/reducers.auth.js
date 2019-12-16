import {authTokenInitialState} from './initialStates';

export function authToken(state = authTokenInitialState, action) {
    switch (action.type) {
        case 'SAVE_AUTH_TOKEN':
            return action.authToken;
        case 'REMOVE_AUTH_TOKEN':
            return authTokenInitialState;
        default:
            return state;
    }
}
