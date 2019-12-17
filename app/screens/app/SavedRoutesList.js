import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';
import {fetchSavedRoutes} from '../../redux/actions/actions.savedRoutes';
import {styles} from '../../theme/styles';

class SavedRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
        };
    }

    refetchRoutes() {
        store.dispatch(fetchSavedRoutes());
    }

    componentDidMount() {
        if (store.getState().savedRoutes.didInvalidate) {
            this.refetchRoutes();
        }
    }

    render() {
        if (store.getState().savedRoutes.isFetching) {
            return <Loader />;
        } else {
            if (store.getState().savedRoutes.items.length === 0) {
                return <Text style={styles.emptyMessage}>{t('no-saved')}</Text>;
            } else {
                return (
                    <List>
                        {store.getState().savedRoutes.items.map(value => {
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
