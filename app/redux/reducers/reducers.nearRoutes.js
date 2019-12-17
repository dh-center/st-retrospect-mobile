import {routesListInitialState} from './initialStates';
import {
    REQUEST_NEAR_ROUTES,
    INVALIDATE_NEAR_ROUTES,
    RECEIVE_NEAR_ROUTES,
} from '../actions/actions.nearRoutes';

export function nearRoutes(state = routesListInitialState, action) {
    switch (action.type) {
        case INVALIDATE_NEAR_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_NEAR_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                latitude: action.latitude,
                longitude: action.longitude,
            });
        case RECEIVE_NEAR_ROUTES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.nearRoutes,
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}
