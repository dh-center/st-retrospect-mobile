import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Body, Button, Fab, H2, Icon, List, ListItem, Right} from 'native-base';
import {GOOGLE_DIRECTIONS_API_KEY} from 'react-native-dotenv';
import {MapWithMarkers} from './MapWithMarkers';
import {saveRoute} from '../../services/api/mutations';
import Loader from '../../components/common/Loader';
import {useMutation} from '@apollo/react-hooks';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {routesUrl} from '../../services/api/endpoints';
import {store} from '../../data/users/store';

const SaveButton = ({routeId}) => {
    const [toggleSave, {loading}] = useMutation(saveRoute, {
        variables: {routeId: '5db32b6977c44a187bef2c8f'},
    });

    if (loading) return <Loader />;
    return (
        <Button transparent onPress={toggleSave}>
            <Icon name="md-star-outline" />
        </Button>
    );
};

export default class RouteDescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
        };
    }

    render() {
        const locations = this.props.navigation.getParam('locations');

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
                <MapWithMarkers
                    locations={locations}
                    deltas={{latitudeDelta: 0.015, longitudeDelta: 0.0121}}
                />
                <ListItem key={this.props.navigation.getParam('name')}>
                    <Body>
                        <H2>{this.props.navigation.getParam('name')}</H2>
                        <Text note>
                            {this.props.navigation.getParam('description')}
                        </Text>
                    </Body>
                    <Right>
                        <ApolloProvider client={client}>
                            <SaveButton
                                routeId={this.props.navigation.getParam(
                                    'routeId',
                                )}
                            />
                        </ApolloProvider>
                    </Right>
                </ListItem>
                <ScrollView style={styles.locationlist}>
                    <List>
                        {locations.map((value, i) => {
                            return (
                                <ListItem key={i}>
                                    <Text>{value.name}</Text>
                                </ListItem>
                            );
                        })}
                    </List>
                </ScrollView>
                <Fab
                    active={true}
                    direction="up"
                    position="bottomRight"
                    style={{backgroundColor: '#f6c23d'}}
                    onPress={() =>
                        this.props.navigation.navigate('RouteNavigation', {
                            locations: locations,
                            routeId: this.props.navigation.getParam('routeId'),
                        })
                    }>
                    <Icon name="md-walk" />
                </Fab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    locationlist: {
        flex: 1,
    },
    btnCentered: {width: 100, flexDirection: 'row', justifyContent: 'center'},
});
