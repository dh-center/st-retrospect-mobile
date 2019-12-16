export function fetchSavedRoutes() {
    return {
        type: 'FETCH_SAVED_ROUTES',
    };
}

export function fetchLikedRoutes() {
    return {
        type: 'FETCH_LIKED_ROUTES',
    };
}

export function fetchNearRoutes(coordinates) {
    return {
        type: 'FETCH_NEAR_ROUTES',
        coordinates,
    };
}

export function fetchSearchedRoutes(query) {
    return {
        type: 'FETCH_SEARCHED_ROUTES',
        query,
    };
}
