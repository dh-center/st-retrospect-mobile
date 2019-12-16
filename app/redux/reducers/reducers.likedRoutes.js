import {routesListInitialState} from './initialStates';
import {
    REQUEST_LIKED_ROUTES,
    INVALIDATE_LIKED_ROUTES,
    RECEIVE_LIKED_ROUTES,
} from '../actions/actions.likedRoutes';

export function likedRoutes(state = routesListInitialState, action) {
    switch (action.type) {
        case INVALIDATE_LIKED_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_LIKED_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case RECEIVE_LIKED_ROUTES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.likedRoutes,
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}
