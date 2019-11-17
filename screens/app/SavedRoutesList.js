import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';

import {List} from 'native-base';
import {ActivityIndicator, Text} from 'react-native';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {savedRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import Loader from '../../components/common/Loader';

const authToken = store.getState().authToken;
const locale = store.getState().locale;


const client = new ApolloClient({
    link: new HttpLink({
        uri: routesUrl,
        headers: {
            "accept-language": locale,
            "Authorization": "Bearer "+authToken
        }
    }),
    cache: new InMemoryCache()
});


const SavedRoutesListData = graphql(savedRoutesQuery)(props => {
    const { error, me } = props.data;

    if (error) {
        console.log(error);
        return <Text>err</Text>;
    }
    if (me) {
        if (me.savedRoutes.length == 0) {
            return <Text>No saved routes yet</Text>
        }
        else {
            return <List>
                {me.savedRoutes.map((value) => {
                    return <RouteItem key={value.id} data={value} navigation={props.navigation}/>;
                })}
            </List>
        }
    }

    return <Loader/>
});


class SavedRoutesList extends Component {

    render() {

        return (
            <ApolloProvider client={client}>
                <SavedRoutesListData navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(SavedRoutesList);
