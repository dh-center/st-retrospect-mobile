import {store} from '../store';
import {
    dislikeRoute,
    likeRoute,
    saveRoute,
    unsaveRoute,
} from '../../services/api/mutations';
import {RECEIVE_SAVED_ROUTES} from './actions.savedRoutes';
import {RECEIVE_LIKED_ROUTES} from './actions.likedRoutes';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';

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
    return async () => {
        let variables = {routeId: routeId};
        const request = await client.mutate({
            mutation: saveRoute,
            variables: variables,
        });
        const result = await request;
        console.log(result.data.saveRoute);
        if (result) {
            store.dispatch({
                type: RECEIVE_SAVED_ROUTES,
                savedRoutes: result.data.saveRoute.savedRoutes,
            });
        }
    };
}

export function mutateRouteUnsave(routeId) {
    return async () => {
        let variables = {routeId: routeId};
        const request = await client.mutate({
            mutation: unsaveRoute,
            variables: variables,
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
