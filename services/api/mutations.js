import React from 'react';
import gql from 'graphql-tag';


export const saveRoute = gql`
  mutation {
  saveRoute(routeId: "5db32b6977c44a187bef2c8f",){
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
  mutation ($routeId){
      likeRoute(routeId: "5db32b6977c44a187bef2c8f"){
        id,
        username,
        savedRoutes{
          id,
          name
        }
      }
    }
`;
