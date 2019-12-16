import {likedRoutesQuery} from '../../services/api/queries';
import {store} from '../store';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';

export const INVALIDATE_LIKED_ROUTES = 'INVALIDATE_LIKED_ROUTES';
export function invalidateLikedRoutes() {
    return {
        type: INVALIDATE_LIKED_ROUTES,
    };
}

export const REQUEST_LIKED_ROUTES = 'REQUEST_LIKED_ROUTES';
export function requestLikedRoutes() {
    return {
        type: REQUEST_LIKED_ROUTES,
    };
}

export const RECEIVE_LIKED_ROUTES = 'RECEIVE_LIKED_ROUTES';
export function receiveLikedRoutes(likedRoutes) {
    return {
        type: RECEIVE_LIKED_ROUTES,
        receivedAt: Date.now(),
        likedRoutes: likedRoutes,
    };
}

export function fetchLikedRoutes() {
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
    store.dispatch(requestLikedRoutes());

    return async () => {
        const request = await client.query({
            query: likedRoutesQuery,
        });
        const result = await request;
        store.dispatch({
            type: RECEIVE_LIKED_ROUTES,
            likedRoutes: result.data.me.likedRoutes,
        });
    };
}
