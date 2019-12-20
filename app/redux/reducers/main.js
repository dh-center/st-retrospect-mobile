import {combineReducers} from 'redux';

import {authToken} from './reducers.auth';
import {locale} from './reducers.i18n';
import {savedRoutes} from './reducers.savedRoutes';
import {likedRoutes} from './reducers.likedRoutes';
import {nearRoutes} from './reducers.nearRoutes';
import {searchedRoutes} from './reducers.searchedRoutes';
import {LOGOUT} from '../actions/actions.auth';

const appReducer = combineReducers({
    authToken,
    locale,
    savedRoutes,
    likedRoutes,
    nearRoutes,
    searchedRoutes,
});

const appFlow = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default appFlow;
