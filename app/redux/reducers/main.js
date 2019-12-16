import {combineReducers} from 'redux';

import {authToken} from './reducers.auth';
import {locale} from './reducers.i18n';
import {routesList} from './reducers.routes';

const appFlow = combineReducers({
    authToken,
    locale,
    routesList,
});

export default appFlow;
