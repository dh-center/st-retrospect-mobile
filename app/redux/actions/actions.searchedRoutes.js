export function fetchSearchedRoutes(query) {
    return {
        type: 'FETCH_SEARCHED_ROUTES',
        query,
    };
}
