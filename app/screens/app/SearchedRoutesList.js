import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {List} from 'native-base';
import {Text} from 'react-native';

import RouteItem from './RouteItem';
import {store} from '../../redux/store';
import Loader from '../../components/common/Loader';
import {t} from '../../locales/i18n';
import {
    fetchSearchedRoutes,
    INVALIDATE_SEARCHED_ROUTES,
} from '../../redux/actions/actions.searchedRoutes';

class SearchedRoutesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
            searchedRoutes: store.getState().searchedRoutes,
        };
    }

    fetchRoutes() {
        store
            .dispatch(fetchSearchedRoutes(this.props.query))
            .then(() =>
                this.setState({
                    searchedRoutes: store.getState().searchedRoutes,
                }),
            );
    }

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            store.dispatch({type: INVALIDATE_SEARCHED_ROUTES});
            this.fetchRoutes();
        }
    }

    render() {
        if (this.state.searchedRoutes.isFetching) {
            return <Loader />;
        } else {
            if (store.getState().searchedRoutes.items.length === 0) {
                return <Text>{t('no-search')}</Text>;
            } else {
                return (
                    <List>
                        {store.getState().searchedRoutes.items.map(value => {
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

export default withNavigation(SearchedRoutesList);
