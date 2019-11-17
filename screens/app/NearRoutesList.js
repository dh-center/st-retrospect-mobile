import React, {Component} from 'react';

import {ApolloProvider, graphql} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {withNavigation} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';

import {List} from 'native-base';

import RouteItem from './RouteItem';
import {routesUrl} from '../../services/api/endpoints';
import {nearRoutesQuery} from '../../services/api/queries';
import {store} from '../../data/users/store';
import Loader from '../../components/common/Loader';


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

    return <Loader/>
});


class NearRoutesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale : store.getState().locale,
            location: null
        };

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
                <NearRoutesListData location={this.state.location} navigation={this.props.navigation}/>
            </ApolloProvider>
        )
    }
}

export default withNavigation(NearRoutesList);
