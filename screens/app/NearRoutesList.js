import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

import {List, View} from 'native-base';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {nearRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import Loader from '../../components/common/Loader';
import {Text} from 'react-native';
import {t} from '../../locales/i18n';


const NearRoutesListData = graphql(nearRoutesQuery,
        {
            options: (props) => ({ variables:
                    {
                        latitude: props.latitude,
                        longitude: props.longitude
                    }
            })
        }
    )(props => {

    const { error, nearestRoutes } = props.data;

    if (error) {
        console.log(error);
        return <Text>err</Text>;
    }
    if (nearestRoutes) {
        if (nearestRoutes.length == 0) {
            return <Text style={{padding: 15}}>{t('no-near')}</Text>
        }
        else {
            return <List>
                        {nearestRoutes.map((value) => {
                            return <RouteItem key={value.id} data={value} navigation={props.navigation}/>;
                        })}
                    </List>
        }
    }

    return <Loader/>
});


class NearRoutesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale : store.getState().locale,
            latitude: null,
            longitude: null
        };
    };


    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                const location = position.coords;
                this.setState({ latitude: location.latitude, longitude: location.longitude });
            },
            error =>console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    componentDidMount () {
        this.findCoordinates();
    }

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
            <View>
                {this.state.latitude && this.state.longitude &&
                    <ApolloProvider client={client}>
                        <NearRoutesListData latitude={this.state.latitude} longitude={this.state.longitude} navigation={this.props.navigation}/>
                    </ApolloProvider>
                }
            </View>
        )
    }
}

export default withNavigation(NearRoutesList);
