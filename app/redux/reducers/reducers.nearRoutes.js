export function nearRoutes(state = {}, action) {
    switch (action.type) {
        case 'FETCH_NEAR_ROUTES':
            return {};
        default:
            return state;
    }
}
