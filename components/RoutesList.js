import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import {List, Button, Icon} from 'native-base';
import {AsyncStorage, Text} from 'react-native';

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

const client = new ApolloClient({
    link: new HttpLink({
        // uri: 'https://api.st-retrospect.dh-center.ru/graphql',
        uri: 'https://api.stage.st-retrospect.dh-center.ru/graphql',
        headers: {
            "accept-language": "ru"
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

    constructor(props) {
        super(props);

        this.state = {
            accessToken: props.accessToken,
        };
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <RoutesListData/>
            </ApolloProvider>
        )
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('LogIn');
    };
}

export default RoutesList;
