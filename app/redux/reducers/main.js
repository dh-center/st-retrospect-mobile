import {combineReducers} from 'redux';

import {authToken} from './reducers.auth';
import {locale} from './reducers.i18n';
import {savedRoutes} from './reducers.savedRoutes';
import {likedRoutes} from './reducers.likedRoutes';
import {nearRoutes} from './reducers.nearRoutes';
import {searchedRoutes} from './reducers.searchedRoutes';

const appFlow = combineReducers({
    authToken,
    locale,
    savedRoutes,
    likedRoutes,
    nearRoutes,
    searchedRoutes,
});

export default appFlow;
