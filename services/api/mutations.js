import React from 'react';
import gql from 'graphql-tag';


export const saveRoute = gql`
  mutation ($routeId: String!) {
   saveRoute(routeId: $routeId,){
    id,
    username,
  	savedRoutes{
      id,
      name
    }
  }
}
`;

export const likeRoute = gql`
  mutation ($routeId: String!){
      likeRoute(routeId: $routeId){
        id,
        username,
        savedRoutes{
          id,
          name
        }
      }
    }
`;
