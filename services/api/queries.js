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
