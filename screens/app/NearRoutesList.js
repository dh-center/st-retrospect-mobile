import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

import {List} from 'native-base';
import {ActivityIndicator, Text} from 'react-native';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {nearRoutesQuery} from '../../services/api/queries';
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


const NearRoutesListData = graphql(nearRoutesQuery)(props => {

    const { error, nearestRoutes } = props.data;

    if (error) {
        return <Text>err</Text>;
    }
    if (nearestRoutes) {
        return <List>
                    {nearestRoutes.map((value) => {
                        return <RouteItem key={value.id} data={value} navigation={props.navigation}/>;
                    })}
                </List>
    }

    return <ActivityIndicator size="small" color="#2d2d2d" />;
});


class NearRoutesList extends Component {

    state = {
        location: null,
    };

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error =>console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    componentDidMount () {
        this.findCoordinates();
    }

    render() {


        return (
            <ApolloProvider client={client}>
                <NearRoutesListData location={this.state.location} navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(NearRoutesList);
