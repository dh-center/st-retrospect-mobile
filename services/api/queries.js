import gql from 'graphql-tag';

export const routesQuery = gql`
    query {
      routes {
        id
        name
        description
        photoLink
      }
    }
`;

export const nearRoutesQuery = gql`
query {
  nearestRoutes(
    center: { latitude: 59.972401, longitude: 30.302212 }
    radius: 4000
  ) {
    id
    name
    description
    photoLink
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
    }
  }
}
`;
