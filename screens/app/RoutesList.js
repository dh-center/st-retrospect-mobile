import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import {Body, Button, Header, Icon, Left, List, Right, StyleProvider, Title} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem'
import {routesUrl} from '../../services/api/endpoints';
import {routesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import getTheme from '../../theme/components/index';
import commonColor from '../../theme/variables/commonColor';

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
                        return <RouteItem data={value} key={value.id}/>
                    })}
                </List>
    }

    return <Text>Loading...</Text>;
});


class RoutesList extends Component {
    static navigationOptions = ({ navigation }) => ({

        header: (
            <StyleProvider  style={getTheme(commonColor)}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Routes</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='search' onPress={showSearchBar()}/>
                        </Button>
                    </Right>
                </Header>
            </StyleProvider>
        )
    });

    render() {
        return (
            <ApolloProvider client={client}>
                <RoutesListData/>
            </ApolloProvider>
        )
    }
}

export default RoutesList;
