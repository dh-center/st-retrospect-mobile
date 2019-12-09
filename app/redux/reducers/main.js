import { combineReducers } from "redux";

import { authToken } from "./reducers.auth";
import { locale } from "./reducers.i18n";

const appFlow = combineReducers({
    authToken,
    locale
});

export default appFlow;
