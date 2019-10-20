import React from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { List } from 'native-base'
import { Text } from 'react-native'

import RouteItem from './RouteItem'

const routesQuery = gql`
    query {
      routes {
        id
        name
        description
        photoLink
      }
    }
`;

const RoutesList = graphql(routesQuery)(props => {
    const { error, routes } = props.data;
    if (error) {
        return <Text>{error}</Text>;
    }
    if (routes) {
        return <List>
                    {routes.map((value) => {
                        return <RouteItem data={value}/>
                    })}
                </List>
    }

    return <Text>Loading...</Text>;
});

export default RoutesList;
