import {routesListInitialState} from './initialStates';
import {
    REQUEST_SAVED_ROUTES,
    INVALIDATE_SAVED_ROUTES,
    RECEIVE_SAVED_ROUTES,
} from '../actions/actions.savedRoutes';

export function savedRoutes(state = routesListInitialState, action) {
    switch (action.type) {
        case INVALIDATE_SAVED_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_SAVED_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case RECEIVE_SAVED_ROUTES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.savedRoutes,
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}
