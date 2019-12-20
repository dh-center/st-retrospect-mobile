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
import {connect} from 'react-redux';

class SavedRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
        };
    }

    fetchRoutes() {
        store.dispatch(fetchSavedRoutes());
    }

    componentDidMount() {
        this.fetchRoutes();
    }

    render() {
        console.log(this.props.savedRoutes);
        console.log(store.getState().savedRoutes);
        if (this.props.savedRoutes.isFetching) {
            return <Loader />;
        } else {
            if (this.props.savedRoutes.items.length === 0) {
                return <Text style={styles.emptyMessage}>{t('no-saved')}</Text>;
            } else {
                return (
                    <List>
                        {this.props.savedRoutes.items.map(value => {
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

function mapStateToProps(state, ownProps) {
    return {
        savedRoutes: state.savedRoutes,
    };
}

export default withNavigation(connect(mapStateToProps)(SavedRoutesList));
