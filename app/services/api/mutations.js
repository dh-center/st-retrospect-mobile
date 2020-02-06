import gql from 'graphql-tag';

export const saveRoute = gql`
    mutation($routeId: String!) {
        saveRoute(routeId: $routeId) {
            id
            username
            savedRoutes {
                id
                name
                description
                photoLink
                locations {
                    id
                    name
                    description
                    coordinateX
                    coordinateY
                }
            }
        }
    }
`;

export const unsaveRoute = gql`
    mutation($routeId: String!) {
        deleteRouteFromSaved(routeId: $routeId) {
            username
            id
            savedRoutes {
                id
                name
                description
                photoLink
                locations {
                    id
                    name
                    description
                    coordinateX
                    coordinateY
                }
            }
        }
    }
`;

export const likeRoute = gql`
    mutation($routeId: String!) {
        likeRoute(routeId: $routeId) {
            id
            username
            likedRoutes {
                id
                name
                description
                photoLink
                locations {
                    id
                    name
                    description
                    coordinateX
                    coordinateY
                }
            }
        }
    }
`;

export const dislikeRoute = gql`
    mutation($routeId: String!) {
        dislikeRoute(routeId: $routeId) {
            username
            id
            likedRoutes {
                id
                name
                description
                photoLink
                locations {
                    id
                    name
                    description
                    coordinateX
                    coordinateY
                }
            }
        }
    }
`;
