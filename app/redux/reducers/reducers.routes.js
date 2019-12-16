export function routesList(state = {}, action) {
    switch (action.type) {
        case 'FETCH_SAVED_ROUTES':
            return {...state, savedRoutes: {}};
        case 'FETCH_LIKED_ROUTES':
            return {...state, likedRoutes: {}};
        case 'FETCH_NEAR_ROUTES':
            return {...state, nearRoutes: {}};
        case 'FETCH_SEARCHED_ROUTES':
            return {...state, searchedRoutes: {}};
        default:
            return state;
    }
}
