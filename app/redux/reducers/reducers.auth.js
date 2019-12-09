export function authToken(state = "", action) {
    switch (action.type) {
        case "SAVE_AUTH_TOKEN":
            return action.authToken;
        case "REMOVE_AUTH_TOKEN":
            return "";
        default:
            return state;
    }
}
