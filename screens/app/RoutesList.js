import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {withNavigation} from 'react-navigation';

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
import {routesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';
import i18n from 'i18n-js';

const authToken = store.getState().authToken;


function showSearchBar() {
    // store.dispatch({type: REMOVE_AUTH_TOKEN});
    // this.props.navigation.navigate('Auth');
    // TODO
}


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
                        return <ListItem avatar key={value.id} button onPress={() => {props.navigation.navigate('Route')}}>
                                    <Left>
                                        <Thumbnail source={{ uri: value.photoLink }} />
                                    </Left>
                                    <Body>
                                    <H2>{ value.name[i18n.locale] }</H2>
                                    <Text note>{ value.description[i18n.locale] }</Text>
                                    </Body>
                                </ListItem>;
                    })}
                </List>
    }

    return <Text>Loading...</Text>;
});


class RoutesList extends Component {




    render() {

        return (
            <ApolloProvider client={client}>
                <RoutesListData navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(RoutesList);
