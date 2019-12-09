import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, H3, Icon} from 'native-base';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import {likeRoute} from '../../services/api/mutations';
import Loader from '../../components/common/Loader';
import {useMutation} from '@apollo/react-hooks';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';
import {store} from '../../redux/users/store';

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
        };
    }

    render() {
        const client = new ApolloClient({
            link: new HttpLink({
                uri: routesUrl,
                headers: {
                    'accept-language': this.state.locale,
                    Authorization: 'Bearer ' + this.state.authToken,
                },
            }),
            cache: new InMemoryCache(),
        });

        return (
            <View style={styles.container}>
                <H3>Congratulations! Route finished.</H3>
                <ApolloProvider client={client}>
                    <LikeButton
                        routeId={this.props.navigation.getParam('routeId')}
                    />
                </ApolloProvider>
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
