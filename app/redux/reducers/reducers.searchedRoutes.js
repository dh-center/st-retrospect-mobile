import {routesListInitialState} from './initialStates';
import {
    REQUEST_SEARCHED_ROUTES,
    INVALIDATE_SEARCHED_ROUTES,
    RECEIVE_SEARCHED_ROUTES,
} from '../actions/actions.searchedRoutes';

export function searchedRoutes(state = routesListInitialState, action) {
    switch (action.type) {
        case INVALIDATE_SEARCHED_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_SEARCHED_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                latitude: action.latitude,
                longitude: action.longitude,
            });
        case RECEIVE_SEARCHED_ROUTES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.searchedRoutes,
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}
