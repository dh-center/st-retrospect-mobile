import {nearRoutesQuery} from '../../services/api/queries';
import {store} from '../store';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';

export const INVALIDATE_NEAR_ROUTES = 'INVALIDATE_NEAR_ROUTES';
export function invalidateNearRoutes() {
    return {
        type: INVALIDATE_NEAR_ROUTES,
    };
}

export const REQUEST_NEAR_ROUTES = 'REQUEST_NEAR_ROUTES';
export function requestNearRoutes(latitude, longitude) {
    return {
        type: REQUEST_NEAR_ROUTES,
    };
}

export const RECEIVE_NEAR_ROUTES = 'RECEIVE_NEAR_ROUTES';
export function receiveNearRoutes(nearRoutes) {
    return {
        type: RECEIVE_NEAR_ROUTES,
        receivedAt: Date.now(),
        nearRoutes: nearRoutes,
    };
}

export function fetchNearRoutes(latitude, longitude) {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: routesUrl,
            headers: {
                'accept-language': store.getState().locale,
                Authorization: 'Bearer ' + store.getState().authToken,
            },
        }),
        cache: new InMemoryCache(),
    });
    store.dispatch(requestNearRoutes());

    return async () => {
        const request = await client.query({
            query: nearRoutesQuery,
            variables: {
                latitude: latitude,
                longitude: longitude,
            },
        });
        const result = await request;
        store.dispatch({
            type: RECEIVE_NEAR_ROUTES,
            nearRoutes: result.data.nearestRoutes,
        });
    };
}
