import {store} from '../store';
import {
    dislikeRoute,
    likeRoute,
    saveRoute,
    unsaveRoute,
} from '../../services/api/mutations';
import {INVALIDATE_SAVED_ROUTES} from './actions.savedRoutes';
import {INVALIDATE_LIKED_ROUTES} from './actions.likedRoutes';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';
import {likedRoutesQuery, savedRoutesQuery} from '../../services/api/queries';

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

export function mutateRouteSave(routeId) {
    return async () => {
        const request = await client.mutate({
            mutation: saveRoute,
            variables: {
                routeId: routeId,
            },
            refetchQueries: savedRoutesQuery,
        });
        const result = await request;
        store.dispatch({
            type: INVALIDATE_SAVED_ROUTES,
        });
    };
}

export function mutateRouteUnsave(routeId) {
    return async () => {
        const request = await client.mutate({
            mutation: unsaveRoute,
            variables: {
                routeId: routeId,
            },
            refetchQueries: savedRoutesQuery,
        });
        const result = await request;
        store.dispatch({
            type: INVALIDATE_SAVED_ROUTES,
        });
    };
}

export function mutateRouteLike(routeId) {
    return async () => {
        const request = await client.mutate({
            mutation: likeRoute,
            variables: {
                routeId: routeId,
            },
            refetchQueries: likedRoutesQuery,
        });
        const result = await request;
        store.dispatch({
            type: INVALIDATE_LIKED_ROUTES,
        });
    };
}

export function mutateRouteDislike(routeId) {
    return async () => {
        const request = await client.mutate({
            mutation: dislikeRoute,
            variables: {
                routeId: routeId,
            },
            refetchQueries: likedRoutesQuery,
        });
        const result = await request;
        store.dispatch({
            type: INVALIDATE_LIKED_ROUTES,
        });
    };
}
