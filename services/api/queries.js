import gql from 'graphql-tag';

export const routesQuery = gql`
    query {
      routes {
        id
        name
        description
        photoLink
        locations {
          id
          name
          coordinateX
          coordinateY      
        }
      }
    }
`;

export const nearRoutesQuery = gql`
query ($latitude: Float!, $longitude: Float!) {
  nearestRoutes(
    center: { latitude: $latitude, longitude: $longitude }
    radius: 4000
  ) {
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
`;

export const savedRoutesQuery = gql`
query {
  me{
    savedRoutes{
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

export const likedRoutesQuery = gql`
query {
  me{
    likedRoutes{
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

export const searchRoutesQuery = gql`
 query ($query: String!) {
  routes(filter: { contains: $query }) {
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
`;

export const routeById = gql`
 query ($routeId: String!) {
  route(id:$routeId){
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
`;
