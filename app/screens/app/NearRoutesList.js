import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {List} from 'native-base';
import {Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import RouteItem from './RouteItem';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';
import {fetchNearRoutes} from '../../redux/actions/actions.nearRoutes';
import {styles} from '../../theme/styles';

class NearRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
            latitude: null,
            longitude: null,
            nearRoutes: store.getState().nearRoutes,
        };
        this.findCoordinates();
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                const location = position.coords;
                this.setState({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    nearRoutes: store.getState().nearRoutes,
                });
                this.fetchRoutes();
            },
            error => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    };

    fetchRoutes() {
        store
            .dispatch(
                fetchNearRoutes(this.state.latitude, this.state.longitude),
            )
            .then(() =>
                this.setState({nearRoutes: store.getState().nearRoutes}),
            );
    }

    render() {
        if (this.state.nearRoutes.isFetching) {
            return <Loader />;
        } else {
            if (store.getState().nearRoutes.items.length === 0) {
                return <Text style={styles.emptyMessage}>{t('no-near')}</Text>;
            } else {
                return (
                    <List>
                        {store.getState().nearRoutes.items.map(value => {
                            return (
                                <RouteItem
                                    key={value.id}
                                    data={value}
                                    navigation={this.props.navigation}
                                />
                            );
                        })}
                    </List>
                );
            }
        }
    }
}

export default withNavigation(NearRoutesList);
