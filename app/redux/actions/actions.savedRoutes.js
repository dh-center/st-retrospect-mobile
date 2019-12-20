import {savedRoutesQuery} from '../../services/api/queries';
import {store} from '../store';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';

export const INVALIDATE_SAVED_ROUTES = 'INVALIDATE_SAVED_ROUTES';
export function invalidateSavedRoutes() {
    return {
        type: INVALIDATE_SAVED_ROUTES,
    };
}

export const REQUEST_SAVED_ROUTES = 'REQUEST_SAVED_ROUTES';
export function requestSavedRoutes() {
    return {
        type: REQUEST_SAVED_ROUTES,
    };
}

export const RECEIVE_SAVED_ROUTES = 'RECEIVE_SAVED_ROUTES';
export function receiveSavedRoutes(savedRoutes) {
    return {
        type: RECEIVE_SAVED_ROUTES,
        receivedAt: Date.now(),
        items: savedRoutes,
    };
}

export function fetchSavedRoutes() {
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
    store.dispatch(requestSavedRoutes());

    return async () => {
        const request = await client.query({
            query: savedRoutesQuery,
        });
        const result = await request;
        store.dispatch({
            type: RECEIVE_SAVED_ROUTES,
            savedRoutes: result.data.me.savedRoutes,
        });
    };
}
