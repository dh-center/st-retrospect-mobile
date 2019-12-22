import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Body, Button, Fab, H2, Icon, List, ListItem, Right} from 'native-base';
import {MapWithMarkers} from './MapWithMarkers';
import {store} from '../../redux/store';
import {
    mutateRouteSave,
    mutateRouteUnsave,
} from '../../redux/actions/actions.mutateRoute';

export default class RouteDescription extends Component {
    constructor(props) {
        super(props);

        const routeId = this.props.navigation.getParam('routeId');

        this.state = {
            authToken: store.getState().authToken,
            locale: store.getState().locale,
            isSaved: this.defineIsSaved(routeId),
            routeId: routeId,
        };

        this.saveRoute = this.saveRoute.bind(this);
        this.unsaveRoute = this.unsaveRoute.bind(this);
    }

    defineIsSaved(routeId) {
        const savedRoutes = store.getState().savedRoutes.items;
        let filteredRoutes = savedRoutes.filter(route => (route.id = routeId));
        return filteredRoutes.length !== 0;
    }

    saveRoute() {
        const routeId = this.state.routeId;
        store.dispatch(mutateRouteSave(routeId));
        this.setState({isSaved: true});
    }

    unsaveRoute() {
        const routeId = this.state.routeId;
        store.dispatch(mutateRouteUnsave(routeId));
        this.setState({isSaved: false});
    }

    render() {
        const locations = this.props.navigation.getParam('locations');
        let saveButton;

        if (this.state.routeId) {
            if (this.state.isSaved) {
                saveButton = (
                    <Button
                        transparent
                        style={styles.saveButton}
                        onPress={this.unsaveRoute}>
                        <Icon name="md-star" />
                    </Button>
                );
            } else {
                saveButton = (
                    <Button
                        transparent
                        style={styles.saveButton}
                        onPress={this.saveRoute}>
                        <Icon name="md-star-outline" />
                    </Button>
                );
            }

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
                        <Right>{saveButton}</Right>
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
                        style={{backgroundColor: '#f6c23d', bottom: 120}}
                        onPress={() =>
                            this.props.navigation.navigate('RouteNavigation', {
                                locations: locations,
                                routeId: this.state.routeId,
                            })
                        }>
                        <Icon name="md-walk" />
                    </Fab>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    locationlist: {
        flex: 1,
    },
    saveButton: {bottom: 70},
});
