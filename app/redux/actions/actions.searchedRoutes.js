import {searchRoutesQuery} from '../../services/api/queries';
import {store} from '../store';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';

export const INVALIDATE_SEARCHED_ROUTES = 'INVALIDATE_SEARCHED_ROUTES';
export function invalidateSearchedRoutes() {
    return {
        type: INVALIDATE_SEARCHED_ROUTES,
    };
}

export const REQUEST_SEARCHED_ROUTES = 'REQUEST_SEARCHED_ROUTES';
export function requestSearchedRoutes() {
    return {
        type: REQUEST_SEARCHED_ROUTES,
    };
}

export const RECEIVE_SEARCHED_ROUTES = 'RECEIVE_SEARCHED_ROUTES';
export function receiveSearchedRoutes(searchedRoutes) {
    return {
        type: RECEIVE_SEARCHED_ROUTES,
        receivedAt: Date.now(),
        searchedRoutes: searchedRoutes,
    };
}

export function fetchSearchedRoutes(query) {
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
    store.dispatch(requestSearchedRoutes());

    return async () => {
        const request = await client.query({
            query: searchRoutesQuery,
            variables: {
                query: query,
            },
        });
        const result = await request;
        store.dispatch({
            type: RECEIVE_SEARCHED_ROUTES,
            searchedRoutes: result.data.routes,
        });
    };
}
