import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {withNavigation} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

import {
    Body,
    Button,
    H2,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    StyleProvider,
    Thumbnail,
    Title,
} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem'
import {routesUrl} from '../../services/api/endpoints';
import {nearRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import i18n from 'i18n-js';

const authToken = store.getState().authToken;

const client = new ApolloClient({
    link: new HttpLink({
        uri: routesUrl,
        headers: {
            "accept-language":  i18n.locale,
            "Authorization": "Bearer "+authToken
        }
    }),
    cache: new InMemoryCache()
});


const NearRoutesListData = graphql(nearRoutesQuery)(props => {
    console.log(props.location);
    const { error, nearestRoutes } = props.data;
    // console.log(props.data)

    if (error) {
        return <Text>err</Text>;
    }
    if (nearestRoutes) {
        return <List>
                    {nearestRoutes.map((value) => {
                        return <RouteItem data={value} navigation={props.navigation}/>;
                    })}
                </List>
    }

    return <Text>Loading...</Text>;
});


class NearRoutesList extends Component {

    state = {
        location: null
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
