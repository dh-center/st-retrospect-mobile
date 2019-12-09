import { locale } from "../reducers/reducers.i18n";

export function setLocale() {
    return {
        type: "SET_LOCALE",
        locale
    };
}
