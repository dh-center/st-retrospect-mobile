import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem'
import {routesUrl} from '../services/api/endpoints';
import {routesQuery} from '../services/api/queries';
import {store} from '../data/users/store';

const authToken = store.getState().authToken;


const client = new ApolloClient({
    link: new HttpLink({
        uri: routesUrl,
        headers: {
            "accept-language": "ru",
            "Authorization": "Bearer "+authToken
        }
    }),
    cache: new InMemoryCache()
});


const RoutesListData = graphql(routesQuery)(props => {
    const { error, routes } = props.data;
    if (error) {
        return <Text>{error}</Text>;
    }
    if (routes) {
        return <List>
                    {routes.map((value) => {
                        return <RouteItem data={value} key={value.id}/>
                    })}
                </List>
    }

    return <Text>Loading...</Text>;
});


class RoutesList extends Component {
    static navigationOptions = {
        title: 'Routes List',
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <RoutesListData/>
            </ApolloProvider>
        )
    }
}

export default RoutesList;
