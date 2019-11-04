import { SAVE_AUTH_TOKEN, REMOVE_AUTH_TOKEN } from './action_types'

const initialState = {
    authToken: '',
};


export default function authProcess(state = initialState, action) {
    switch (action.type) {
        case SAVE_AUTH_TOKEN:
            return Object.assign({}, state, {
                authToken: action.authToken,
            });
        case REMOVE_AUTH_TOKEN:
            return Object.assign({}, state, initialState);
    default:
        return state
    }
}
