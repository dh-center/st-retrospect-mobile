export function authToken(state = {}, action) {
    switch (action.type) {
        case 'SAVE_AUTH_TOKEN':
            return {...state, authToken: action.authToken};
        case 'REMOVE_AUTH_TOKEN':
            return {...state};
        default:
            return state;
    }
}
