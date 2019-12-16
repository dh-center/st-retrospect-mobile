export function likedRoutes(state = {}, action) {
    switch (action.type) {
        case 'FETCH_LIKED_ROUTES':
            return {};
        default:
            return state;
    }
}
