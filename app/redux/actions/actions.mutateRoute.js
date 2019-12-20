import {store} from '../store';
import {
    dislikeRoute,
    likeRoute,
    saveRoute,
    unsaveRoute,
} from '../../services/api/mutations';
import {RECEIVE_SAVED_ROUTES} from './actions.savedRoutes';
import {
    INVALIDATE_LIKED_ROUTES,
    RECEIVE_LIKED_ROUTES,
} from './actions.likedRoutes';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';
import {likedRoutesQuery, savedRoutesQuery} from '../../services/api/queries';

const client = new ApolloClient({
    link: new HttpLink({
        uri: routesUrl,
        headers: {
            Authorization: 'Bearer ' + store.getState().authToken,
            'accept-language': store.getState().locale,
        },
    }),
    cache: new InMemoryCache(),
});

export function mutateRouteSave(routeId) {
    console.log(routeId);
    return async () => {
        const request = await client.mutate({
            mutation: saveRoute,
            variables: {
                routeId: routeId,
            },
        });
        const result = await request;
        if (result) {
            store.dispatch({
                type: RECEIVE_SAVED_ROUTES,
                savedRoutes: result.data.saveRoute.savedRoutes,
            });
        }
    };
}

export function mutateRouteUnsave(routeId) {
    console.log(routeId);

    return async () => {
        const request = await client.mutate({
            mutation: unsaveRoute,
            variables: {
                routeId: routeId,
            },
        });
        const result = await request;
        console.log(result.data.deleteRouteFromSaved);
        if (result) {
            store.dispatch({
                type: RECEIVE_SAVED_ROUTES,
                savedRoutes: result.data.deleteRouteFromSaved.savedRoutes,
            });
        }
    };
}

export function mutateRouteLike(routeId) {
    return async () => {
        let variables = {routeId: routeId};
        const request = await client.mutate({
            mutation: likeRoute,
            variables: variables,
        });
        const result = await request;
        console.log(result.data.likeRoute);
        if (result) {
            store.dispatch({
                type: RECEIVE_LIKED_ROUTES,
                likedRoutes: result.data.likeRoute.likedRoutes,
            });
        }
    };
}

export function mutateRouteDislike(routeId) {
    return async () => {
        if (routeId) {
            let variables = {routeId: routeId};
            const request = await client.mutate({
                mutation: dislikeRoute,
                variables: variables,
            });
            const result = await request;
            console.log(result.data.dislikeRoute);
            if (result) {
                store.dispatch({
                    type: RECEIVE_LIKED_ROUTES,
                    likedRoutes: result.data.dislikeRoute.likedRoutes,
                });
            }
        }
    };
}
