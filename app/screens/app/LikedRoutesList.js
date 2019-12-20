import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';
import {fetchLikedRoutes} from '../../redux/actions/actions.likedRoutes';
import {styles} from '../../theme/styles';
import {connect} from 'react-redux';

class LikedRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
        };
    }

    fetchRoutes() {
        store.dispatch(fetchLikedRoutes());
    }

    componentDidMount() {
        this.fetchRoutes();
    }

    render() {
        if (this.props.likedRoutes.isFetching) {
            return <Loader />;
        } else {
            if (this.props.likedRoutes.items.length === 0) {
                return <Text style={styles.emptyMessage}>{t('no-liked')}</Text>;
            } else {
                return (
                    <List>
                        {this.props.likedRoutes.items.map(value => {
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
        likedRoutes: state.likedRoutes,
    };
}

export default withNavigation(connect(mapStateToProps)(LikedRoutesList));
