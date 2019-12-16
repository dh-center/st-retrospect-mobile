import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';
import {fetchSavedRoutes} from '../../redux/actions/actions.savedRoutes';

class SavedRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
            savedRoutes: store.getState().savedRoutes,
        };
        store
            .dispatch(fetchSavedRoutes())
            .then(() =>
                this.setState({savedRoutes: store.getState().savedRoutes}),
            );
    }

    render() {
        if (this.state.savedRoutes.isFetching) {
            return <Loader />;
        } else {
            if (this.state.savedRoutes.items.length === 0) {
                return <Text>{t('no-saved')}</Text>;
            } else {
                return (
                    <List>
                        {this.state.savedRoutes.items.map(value => {
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

export default withNavigation(SavedRoutesList);
