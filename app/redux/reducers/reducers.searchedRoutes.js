export function searchedRoutes(state = {}, action) {
    switch (action.type) {
        case 'FETCH_SEARCHED_ROUTES':
            return {};
        default:
            return state;
    }
}
