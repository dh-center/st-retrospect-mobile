import i18n from "i18n-js";

export function locale(state = i18n.locale, action) {
    switch (action.type) {
        case "SET_LOCALE":
            return action.locale;
        default:
            return state;
    }
}
