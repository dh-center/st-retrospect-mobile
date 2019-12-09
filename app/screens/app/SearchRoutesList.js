import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';

import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {searchRoutesQuery} from '../../services/api/queries';
import {store} from '../../redux/users/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';

const SearchRoutesListData = graphql(searchRoutesQuery, {
    options: props => ({variables: {query: props.query}}),
})(props => {
    const {error, routes} = props.data;

    if (error) {
        console.log(error);
        return <Text>err</Text>;
    }
    if (routes) {
        if (routes.length == 0) {
            return <Text style={{padding: 15}}>{t('no-search')}</Text>;
        } else {
            return (
                <List>
                    {routes.map(value => {
                        return (
                            <RouteItem
                                key={value.id}
                                data={value}
                                navigation={props.navigation}
                            />
                        );
                    })}
                </List>
            );
        }
    }

    return <Loader />;
});

class SearchRoutesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
        };
    }

    render() {
        const client = new ApolloClient({
            link: new HttpLink({
                uri: routesUrl,
                headers: {
                    'accept-language': this.state.locale,
                    Authorization: 'Bearer ' + this.state.authToken,
                },
            }),
            cache: new InMemoryCache(),
        });

        return (
            <ApolloProvider client={client}>
                <SearchRoutesListData
                    query={this.props.query}
                    navigation={this.props.navigation}
                />
            </ApolloProvider>
        );
    }
}

export default withNavigation(SearchRoutesList);
