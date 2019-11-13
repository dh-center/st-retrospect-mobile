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
import {likedRoutesQuery} from '../../services/api/queries';
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


const ForYouRoutesListData = graphql(likedRoutesQuery)(props => {
    const { error, me } = props.data;
    console.log(props.data)

    if (error) {
        return <Text>err</Text>;
    }
    if (me) {
        return <List>
                    {me.likedRoutes.map((value) => {
                        return <RouteItem data={value} navigation={props.navigation}/>;
                    })}
                </List>
    }

    return <Text>Loading...</Text>;
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
