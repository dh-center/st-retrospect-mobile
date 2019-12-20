export const SAVE_AUTH_TOKEN = 'SAVE_AUTH_TOKEN';
export function saveAuthToken(authToken) {
    return {
        type: 'SAVE_AUTH_TOKEN',
        authToken,
    };
}

export const REMOVE_AUTH_TOKEN = 'REMOVE_AUTH_TOKEN';
export function removeAuthToken() {
    return {
        type: 'REMOVE_AUTH_TOKEN',
    };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
    return {
        type: 'LOGOUT',
    };
}
