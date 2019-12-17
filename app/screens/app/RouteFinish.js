import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, H3, Icon} from 'native-base';
import {likeRoute} from '../../services/api/mutations';
import Loader from '../../components/common/Loader';
import {useMutation} from '@apollo/react-hooks';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';
import {store} from '../../redux/store';
import {
    mutateRouteDislike,
    mutateRouteLike,
} from '../../redux/actions/actions.mutateRoute';
import {fetchLikedRoutes} from '../../redux/actions/actions.likedRoutes';

const LikeButton = ({routeId}) => {
    const [toggleLike, {loading}] = useMutation(likeRoute, {
        variables: {routeId: routeId},
    });

    if (loading) return <Loader />;
    return (
        <Button transparent onPress={toggleLike}>
            <Icon name="md-heart-empty" />
        </Button>
    );
};

export default class RouteFinish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
            isLiked: this.defineIsLiked(),
        };

        this.likeRoute = this.likeRoute.bind(this);
        this.dislikeRoute = this.dislikeRoute.bind(this);
    }

    defineIsLiked() {
        const likedRoutes = store.getState().likedRoutes.items;
        let filteredRoutes = likedRoutes.filter(
            route => (route.id = this.props.navigation.getParam('routeId')),
        );
        return filteredRoutes.length !== 0;
    }

    likeRoute() {
        store.dispatch(
            mutateRouteLike(this.props.navigation.getParam('routeId')),
        );
        this.setState({isLiked: true});
        store.dispatch(fetchLikedRoutes());
    }

    dislikeRoute() {
        store.dispatch(
            mutateRouteDislike(this.props.navigation.getParam('routeId')),
        );
        this.setState({isLiked: false});
        store.dispatch(fetchLikedRoutes());
    }

    render() {
        let likeButton;

        if (this.state.isLiked) {
            likeButton = (
                <Button transparent onPress={this.dislikeRoute}>
                    <Icon name="md-heart" />
                </Button>
            );
        } else {
            likeButton = (
                <Button transparent onPress={this.likeRoute}>
                    <Icon name="md-heart-empty" />
                </Button>
            );
        }

        return (
            <View style={styles.container}>
                <H3>Congratulations! Route finished.</H3>
                {likeButton}
                <Button
                    style={styles.btnCentered}
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>FINISH</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCentered: {width: 100, flexDirection: 'row', justifyContent: 'center'},
});
