import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';

import {List} from 'native-base';
import { Text} from 'react-native';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {savedRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';


const SavedRoutesListData = graphql(savedRoutesQuery)(props => {
    const { error, me } = props.data;

    if (error) {
        return <Text>err</Text>;
    }
    if (me) {
        if (me.savedRoutes.length == 0) {
            return <Text style={{padding: 15}}>{t('no-saved')}</Text>
        }
        else {
            return <List>
                {
                    me.savedRoutes.map((value) => {
                        return <RouteItem key={value.id} data={value} navigation={props.navigation}/>;
                    })
                }
                   </List>
        }
    }

    return <Loader/>
});


class SavedRoutesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale : store.getState().locale,
        };

    };


    render() {

        const client = new ApolloClient({
            link: new HttpLink({
                uri: routesUrl,
                headers: {
                    "accept-language":  this.state.locale,
                    "Authorization": "Bearer "+this.state.authToken
                }
            }),
            cache: new InMemoryCache()
        });

        return (
            <ApolloProvider client={client}>
                <SavedRoutesListData navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(SavedRoutesList);
