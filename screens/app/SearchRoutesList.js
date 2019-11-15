import React, {Component, } from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';

import {List} from 'native-base';
import {Text, ActivityIndicator} from 'react-native';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {searchRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import i18n from 'i18n-js';

const authToken = store.getState().authToken;

const locale = store.getState().locale;

const client = new ApolloClient({
    link: new HttpLink({
        uri: routesUrl,
        headers: {
            "accept-language":  locale,
            "Authorization": "Bearer "+authToken
        }
    }),
    cache: new InMemoryCache()
});


const SearchRoutesListData = graphql(searchRoutesQuery,
            {
                options: (props) => ({ variables: { query: props.query } })
            }
    )(props => {

    const { error, routes } = props.data;

    if (error) {
        console.log(error);
        return <Text>err</Text>;
    }
    if (routes) {
        return <List>
                    {routes.map((value) => {
                        return <RouteItem key={value.id} data={value} navigation={props.navigation}/>;
                    })}
                </List>
    }

    return <ActivityIndicator size="small" color="#2d2d2d" />;
});


class SearchRoutesList extends Component {

    render() {

        return (
            <ApolloProvider client={client}>
                <SearchRoutesListData query={this.props.query} navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(SearchRoutesList);
