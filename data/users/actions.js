import {SAVE_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOCALE} from './action_types';

export function saveAuthToken(authToken) {
    return {
        type: SAVE_AUTH_TOKEN,
        authToken,
    }
}

export function removeAuthToken() {
    return {
        type: REMOVE_AUTH_TOKEN,
    }
}

export function setLocale() {
    return {
        type: SET_LOCALE,
        locale
    }
}
