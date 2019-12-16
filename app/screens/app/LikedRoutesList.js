import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';
import {fetchLikedRoutes} from '../../redux/actions/actions.likedRoutes';

class LikedRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
            likedRoutes: store.getState().likedRoutes,
        };
        store
            .dispatch(fetchLikedRoutes())
            .then(() =>
                this.setState({likedRoutes: store.getState().likedRoutes}),
            );
    }

    render() {
        if (this.state.likedRoutes.isFetching) {
            return <Loader />;
        } else {
            if (this.state.likedRoutes.items.length === 0) {
                return <Text>{t('no-liked')}</Text>;
            } else {
                return (
                    <List>
                        {this.state.likedRoutes.items.map(value => {
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

export default withNavigation(LikedRoutesList);
