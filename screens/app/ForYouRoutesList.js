import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';

import {List} from 'native-base';
import {ActivityIndicator, Text} from 'react-native';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {likedRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';


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


const ForYouRoutesListData = graphql(likedRoutesQuery)(props => {
    const { error, me } = props.data;

    if (error) {
        return <Text>err</Text>;
    }
    if (me) {
        return <List>
                    {me.likedRoutes.map((value) => {
                        return <RouteItem key={value.id} data={value} navigation={props.navigation}/>;
                    })}
                </List>
    }

    return <ActivityIndicator size="small" color="#2d2d2d" />;
});


class ForYouRoutesList extends Component {

    render() {

        return (
            <ApolloProvider client={client}>
                <ForYouRoutesListData navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(ForYouRoutesList);
