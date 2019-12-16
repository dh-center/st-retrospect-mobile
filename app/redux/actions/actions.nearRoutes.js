export function fetchNearRoutes(coordinates) {
    return {
        type: 'FETCH_NEAR_ROUTES',
        coordinates,
    };
}
